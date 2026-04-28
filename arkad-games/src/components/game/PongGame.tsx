/**
 * PongGame.tsx — Mini-juego Pong Cyberpunk.
 *
 * ¿Cómo funciona un juego con Canvas?
 * HTML Canvas es como un "lienzo" donde podemos dibujar formas,
 * líneas, texto, etc. usando JavaScript. Para crear un juego:
 *
 * 1. Dibujamos el estado actual (posiciones de la pelota, palas, etc.)
 * 2. Actualizamos las posiciones (la pelota se mueve, el jugador mueve su pala)
 * 3. Borramos todo y volvemos a dibujar con las nuevas posiciones
 * 4. Repetimos esto ~60 veces por segundo → ¡animación fluida!
 *
 * Este ciclo se llama "Game Loop" y es la base de TODOS los videojuegos.
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Configuración del juego ───────────────────────────────────
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const BALL_SIZE = 10;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 5;
const MAX_SCORE = 7;

// Colores neón cyberpunk
const COLORS = {
  bg: "#09090b",
  gridLine: "rgba(176, 38, 255, 0.05)",
  centerLine: "rgba(255, 255, 255, 0.1)",
  player: "#00f0ff",      // Cian neón
  playerGlow: "rgba(0, 240, 255, 0.3)",
  cpu: "#ff00ea",          // Rosa neón
  cpuGlow: "rgba(255, 0, 234, 0.3)",
  ball: "#b026ff",         // Púrpura neón
  ballGlow: "rgba(176, 38, 255, 0.4)",
  text: "#ffffff",
  score: "rgba(255, 255, 255, 0.15)",
};

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const keysRef = useRef<Set<string>>(new Set());
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [winner, setWinner] = useState<string>("");

  // ─── Estado del juego (refs para rendimiento) ──────────────
  // Usamos refs en vez de state para las posiciones porque
  // se actualizan 60 veces por segundo. Si usáramos useState,
  // React haría 60 re-renders por segundo = lentísimo.
  const gameRef = useRef({
    playerY: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    cpuY: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    ballX: CANVAS_WIDTH / 2,
    ballY: CANVAS_HEIGHT / 2,
    ballSpeedX: INITIAL_BALL_SPEED,
    ballSpeedY: INITIAL_BALL_SPEED * 0.5,
    playerScore: 0,
    cpuScore: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
  });

  // ─── Crear partículas (efecto visual al golpear) ──────────
  const createParticles = useCallback((x: number, y: number, color: string) => {
    const game = gameRef.current;
    for (let i = 0; i < 8; i++) {
      game.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1,
        color,
      });
    }
  }, []);

  // ─── Reset de la pelota ────────────────────────────────────
  const resetBall = useCallback(() => {
    const game = gameRef.current;
    game.ballX = CANVAS_WIDTH / 2;
    game.ballY = CANVAS_HEIGHT / 2;
    // Dirección aleatoria
    game.ballSpeedX = INITIAL_BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    game.ballSpeedY = INITIAL_BALL_SPEED * 0.5 * (Math.random() > 0.5 ? 1 : -1);
  }, []);

  // ─── Game Loop (el corazón del juego) ──────────────────────
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const game = gameRef.current;

    // ── 1. INPUT: Leer las teclas presionadas ──
    if (keysRef.current.has("ArrowUp") || keysRef.current.has("w")) {
      game.playerY = Math.max(0, game.playerY - PADDLE_SPEED);
    }
    if (keysRef.current.has("ArrowDown") || keysRef.current.has("s")) {
      game.playerY = Math.min(
        CANVAS_HEIGHT - PADDLE_HEIGHT,
        game.playerY + PADDLE_SPEED
      );
    }

    // ── 2. IA del CPU (sigue la pelota con un poco de retraso) ──
    const cpuCenter = game.cpuY + PADDLE_HEIGHT / 2;
    const diff = game.ballY - cpuCenter;
    // El CPU se mueve más lento que el jugador para que sea posible ganar
    game.cpuY += diff * 0.04;
    game.cpuY = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, game.cpuY));

    // ── 3. FÍSICA: Mover la pelota ──
    game.ballX += game.ballSpeedX;
    game.ballY += game.ballSpeedY;

    // Rebote en bordes superior/inferior
    if (game.ballY <= 0 || game.ballY >= CANVAS_HEIGHT - BALL_SIZE) {
      game.ballSpeedY *= -1;
      createParticles(game.ballX, game.ballY, COLORS.ball);
    }

    // Colisión con pala del jugador (izquierda)
    if (
      game.ballX <= PADDLE_WIDTH + 20 &&
      game.ballX >= 20 &&
      game.ballY + BALL_SIZE >= game.playerY &&
      game.ballY <= game.playerY + PADDLE_HEIGHT &&
      game.ballSpeedX < 0
    ) {
      game.ballSpeedX *= -1.05; // Acelerar un poco
      // Ajustar ángulo según dónde golpea la pala
      const hitPos = (game.ballY - game.playerY) / PADDLE_HEIGHT;
      game.ballSpeedY = (hitPos - 0.5) * INITIAL_BALL_SPEED * 2;
      createParticles(game.ballX, game.ballY, COLORS.player);
    }

    // Colisión con pala del CPU (derecha)
    if (
      game.ballX + BALL_SIZE >= CANVAS_WIDTH - PADDLE_WIDTH - 20 &&
      game.ballX + BALL_SIZE <= CANVAS_WIDTH - 20 &&
      game.ballY + BALL_SIZE >= game.cpuY &&
      game.ballY <= game.cpuY + PADDLE_HEIGHT &&
      game.ballSpeedX > 0
    ) {
      game.ballSpeedX *= -1.05;
      const hitPos = (game.ballY - game.cpuY) / PADDLE_HEIGHT;
      game.ballSpeedY = (hitPos - 0.5) * INITIAL_BALL_SPEED * 2;
      createParticles(game.ballX, game.ballY, COLORS.cpu);
    }

    // ── 4. PUNTUACIÓN ──
    // Pelota sale por la izquierda → punto para CPU
    if (game.ballX < 0) {
      game.cpuScore++;
      setCpuScore(game.cpuScore);
      if (game.cpuScore >= MAX_SCORE) {
        setWinner("CPU");
        setGameState("gameover");
        return;
      }
      resetBall();
    }
    // Pelota sale por la derecha → punto para Jugador
    if (game.ballX > CANVAS_WIDTH) {
      game.playerScore++;
      setPlayerScore(game.playerScore);
      if (game.playerScore >= MAX_SCORE) {
        setWinner("¡Tú!");
        setGameState("gameover");
        return;
      }
      resetBall();
    }

    // ── 5. PARTÍCULAS: Actualizar ──
    game.particles = game.particles
      .map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 0.03,
      }))
      .filter((p) => p.life > 0);

    // ══════════════════════════════════════════════════════════
    // 6. DIBUJAR TODO
    // ══════════════════════════════════════════════════════════

    // Fondo
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid decorativo cyberpunk
    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_WIDTH; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    // Línea central
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = COLORS.centerLine;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Marcador
    ctx.fillStyle = COLORS.score;
    ctx.font = "bold 120px Arial";
    ctx.textAlign = "center";
    ctx.fillText(String(game.playerScore), CANVAS_WIDTH / 4, 130);
    ctx.fillText(String(game.cpuScore), (CANVAS_WIDTH / 4) * 3, 130);

    // Pala del jugador (con glow neón)
    ctx.shadowColor = COLORS.playerGlow;
    ctx.shadowBlur = 20;
    ctx.fillStyle = COLORS.player;
    ctx.fillRect(20, game.playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.shadowBlur = 0;

    // Pala del CPU (con glow neón)
    ctx.shadowColor = COLORS.cpuGlow;
    ctx.shadowBlur = 20;
    ctx.fillStyle = COLORS.cpu;
    ctx.fillRect(
      CANVAS_WIDTH - PADDLE_WIDTH - 20,
      game.cpuY,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );
    ctx.shadowBlur = 0;

    // Pelota (con glow neón)
    ctx.shadowColor = COLORS.ballGlow;
    ctx.shadowBlur = 25;
    ctx.fillStyle = COLORS.ball;
    ctx.beginPath();
    ctx.arc(
      game.ballX + BALL_SIZE / 2,
      game.ballY + BALL_SIZE / 2,
      BALL_SIZE,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Estela de la pelota (trail)
    ctx.fillStyle = `rgba(176, 38, 255, 0.15)`;
    ctx.beginPath();
    ctx.arc(
      game.ballX + BALL_SIZE / 2 - game.ballSpeedX * 2,
      game.ballY + BALL_SIZE / 2 - game.ballSpeedY * 2,
      BALL_SIZE * 0.7,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Partículas
    game.particles.forEach((p) => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 3, 3);
    });
    ctx.globalAlpha = 1;

    // Labels
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("TÚ", CANVAS_WIDTH / 4, CANVAS_HEIGHT - 15);
    ctx.fillText("CPU", (CANVAS_WIDTH / 4) * 3, CANVAS_HEIGHT - 15);

    // ── 7. SIGUIENTE FRAME ──
    animationRef.current = requestAnimationFrame(gameLoop);
  }, [createParticles, resetBall]);

  // ─── Iniciar juego ─────────────────────────────────────────
  const startGame = useCallback(() => {
    const game = gameRef.current;
    game.playerY = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    game.cpuY = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    game.playerScore = 0;
    game.cpuScore = 0;
    game.particles = [];
    setPlayerScore(0);
    setCpuScore(0);
    resetBall();
    setGameState("playing");
  }, [resetBall]);

  // ─── Efectos ───────────────────────────────────────────────
  useEffect(() => {
    if (gameState === "playing") {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameState, gameLoop]);

  // Escuchar teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      // Prevenir scroll con flechas
      if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Dibujar pantalla inicial
  useEffect(() => {
    if (gameState !== "ready") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid
    ctx.strokeStyle = COLORS.gridLine;
    for (let x = 0; x < CANVAS_WIDTH; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke();
    }

    ctx.fillStyle = COLORS.text;
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("CYBER PONG", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "16px Arial";
    ctx.fillText("Usa ↑ ↓ o W S para mover tu pala", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
    ctx.fillText(`Primero en llegar a ${MAX_SCORE} puntos gana`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
  }, [gameState]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Marcador */}
      <div className="flex items-center gap-8 text-xl font-bold">
        <span className="text-[#00f0ff]">TÚ: {playerScore}</span>
        <span className="text-zinc-500">vs</span>
        <span className="text-[#ff00ea]">CPU: {cpuScore}</span>
      </div>

      {/* Canvas del juego */}
      <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(176,38,255,0.1)]">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block max-w-full"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Overlay de game over */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <p className="text-4xl font-extrabold text-white">
              {winner === "¡Tú!" ? "🏆 ¡VICTORIA!" : "💀 DERROTA"}
            </p>
            <p className="mt-2 text-zinc-400">
              {playerScore} - {cpuScore}
            </p>
            <button
              onClick={startGame}
              className="mt-6 rounded-full bg-[#b026ff] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#9b1fe0] hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]"
            >
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      {/* Botón de inicio */}
      {gameState === "ready" && (
        <button
          onClick={startGame}
          id="start-game-btn"
          className="rounded-full bg-[#b026ff] px-10 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-[#9b1fe0] hover:shadow-[0_0_30px_rgba(176,38,255,0.4)] hover:scale-105 animate-pulse"
        >
          🎮 ¡Empezar a Jugar!
        </button>
      )}

      {/* Controles */}
      <p className="text-sm text-zinc-600">
        Controles: ↑ ↓ (flechas) o W S
      </p>
    </div>
  );
}
