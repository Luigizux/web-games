import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-tic-tac-toe',
  styleUrl: './tic-tac-toe.css',
  templateUrl: './tic-tac-toe.html',
})
export class TicTacToeComponent {
  constructor() { }
  tablero: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  marcador: string[] = [];
  jugador: number = 1;
  hasWinner: boolean = false;
  hasDraw: boolean = false;

  onClick(x: number, y: number) {
    if (!this.hasWinner) {
      if (this.tablero[x][y] !== "X" && this.tablero[x][y] !== "O") {
        const relleno = this.jugador === 1 ? "X" : "O";
        this.tablero[x][y] = relleno;

        this.calculateWinner();
        if (!this.hasWinner) this.jugador = this.jugador !== 1 ? 1 : 2;
      }
    }
  }

  calculateWinner() {
    const jugadorActual = this.jugador === 1 ? "X" : "O";

    let cont = 0;
    // Comenzamos contando en horizontal por cada fila
    for (let i = 0; i < 3; i++) {
      if (cont < 3) cont = 0;
      for (let j = 0; j < 3; j++) {
        // const element = this.tablero[i][j];
        if (cont < 3 && this.tablero[i][j] === jugadorActual) {
          cont++;
        }
      }
    }

    // Contamos en vertical
    for (let j = 0; j < 3; j++) {
      if (cont < 3) cont = 0;
      for (let i = 0; i < 3; i++) {
        if (cont < 3 && this.tablero[i][j] === jugadorActual) {
          cont++;
        }
      }
    }

    // Contamos en diagonal hacia delante
    if (cont < 3) cont = 0;
    if ((this.tablero[0][0] === jugadorActual && this.tablero[1][1] === jugadorActual && this.tablero[2][2] === jugadorActual)
      || (this.tablero[0][2] === jugadorActual && this.tablero[1][1] === jugadorActual && this.tablero[2][0] === jugadorActual)
    ) { cont = 3; }

    if (cont === 3) {
      this.hasWinner = true;
      this.marcador.push(jugadorActual);
    }
    if (!this.hasWinner && this.isBoardFull()) {
      this.hasDraw = true;
      this.marcador.push("Empate");
    }
  }

  isBoardFull(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tablero[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  }

  resetGame() {
    this.tablero = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.jugador = 1;
    this.hasWinner = false;
  }
}
