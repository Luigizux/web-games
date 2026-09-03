import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-memory',
  styleUrl: './memory.css',
  templateUrl: './memory.html',
})
export class MemoryComponent {
  constructor() { }
  levels: number[] = [2, 4, 6]; // Niveles de dificultad (tamaño del tablero);
  hasWinner: boolean = false;
  // selectedLevel: number = 2; // Nivel de dificultad inicial (tamaño del tablero)
  selectedLevel = signal(2); // Nivel de dificultad inicial (tamaño del tablero)

  tablero = signal<string[][]>([]); // Tablero de juego
  visibleCards: boolean[][] = []; // Cartas visibles

  firstCard: { x: number, y: number } | null = null; // Primera carta volteada
  secondCard: { x: number, y: number } | null = null; // Segunda carta volteada

  disabled = signal(false); // Para evitar que el usuario haga clic mientras se comparan las cartas

  flippedCards = signal<{ x: number, y: number }[]>([]); // Cartas volteadas
  iconsCards: { [key: string]: string } = {
    "A": "🍎",
    "B": "🍌",
    "C": "🍇",
    "D": "🍓",
    "E": "🍍",
    "F": "🥝",
    "G": "🍉",
    "H": "🍒",
    "I": "🥭",
    "J": "🍑",
    "K": "🍋",
    "L": "🥥",
    "M": "🍈",
    "N": "🍊",
    "O": "🥑",
    "P": "🍐",
    "Q": "🍅",
    "R": "🥔",
  };
  ngOnInit() {
    // Inicializamos el tablero con el nivel seleccionado
    this.tablero.set(this.createBoard(this.selectedLevel()));
  }

  // Maneja el clic en una carta
  onCardClick(x: number, y: number) {
    if (this.disabled() || this.flippedCards().some(card => card.x === x && card.y === y)) {
      return; // Si el juego está deshabilitado o la carta ya está volteada, no hacemos nada
    }

    // Si no hay ninguna carta seleccionada, seleccionamos la primera
    if (!this.firstCard) {
      this.firstCard = { x, y };
      this.flippedCards.set([...this.flippedCards(), { x, y }]);
    } else if (!this.secondCard) { // Si ya hay una carta seleccionada, seleccionamos la segunda
      this.secondCard = { x, y };
      this.flippedCards.set([...this.flippedCards(), { x, y }]);

      // Comparamos las cartas después de un pequeño retraso para que el usuario pueda ver la segunda carta
      this.disabled.set(true);
      setTimeout(() => {
        const firstValue = this.tablero()[this.firstCard!.x][this.firstCard!.y];
        const secondValue = this.tablero()[this.secondCard!.x][this.secondCard!.y];

        if (firstValue !== secondValue) {
          // Si no coinciden, las volteamos de nuevo
          this.flippedCards.set(this.flippedCards().filter(card => !(card.x === this.firstCard!.x && card.y === this.firstCard!.y) && !(card.x === this.secondCard!.x && card.y === this.secondCard!.y)));
        }

        // Reseteamos las cartas seleccionadas
        this.firstCard = null;
        this.secondCard = null;
        this.disabled.set(false);

        // Verificamos si el jugador ha ganado
        this.checkWinner();
      }, 750);
    }
  }

  // Crea un tablero de juego basado en el nivel seleccionado
  createBoard(level: number): string[][] {
    const totalCards = level * level;
    const uniqueCards = totalCards / 2;
    const cardValues = Object.keys(this.iconsCards).slice(0, uniqueCards);
    const cards = [...cardValues, ...cardValues]; // Duplicamos las cartas para tener pares
    this.shuffleArray(cards); // Mezclamos las cartas

    const board: string[][] = [];
    for (let i = 0; i < level; i++) {
      board[i] = [];
      for (let j = 0; j < level; j++) {
        board[i][j] = cards[i * level + j];
      }
    }
    return board;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  checkWinner() {
    if (this.flippedCards().length === this.tablero().length * this.tablero().length) {
      this.hasWinner = true;
      this.nextLevel();
    }
  }

  resetGame() {
    this.tablero.set(this.createBoard(2)); // Reiniciamos el tablero al nivel inicial
    this.flippedCards.set([]);
    this.firstCard = null;
    this.secondCard = null;
    this.hasWinner = false;
  }

  nextLevel() {

    if (this.selectedLevel() >= 6) {
      return;
    }

    this.selectedLevel.set(this.selectedLevel() + 2);
    this.tablero.set(this.createBoard(this.selectedLevel()));

    this.flippedCards.set([]);
    this.firstCard = null;
    this.secondCard = null;
    this.hasWinner = false;
    this.disabled.set(false);
  }

  // Método para verificar si una carta está volteada
  isCardFlipped(x: number, y: number): boolean {
    return this.flippedCards().some(card => card.x === x && card.y === y);
  }

}
