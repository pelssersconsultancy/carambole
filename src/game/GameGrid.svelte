<script lang="ts">
import { isBackspacePressed, isEnterPressed, isNumberPressed, isShiftSPressed } from '../helpers/keyhelpers';

import { Stack } from '../helpers/stack';
import GridCell from '../UI/GridCell.svelte';
import type { DerivedGame } from './game';
import { GameMode , Players} from "./game";
import { gameStore} from './game.store';

export let game: DerivedGame;

let  currentScorePlayer1 = new Stack<number>();
let  currentScorePlayer2 = new Stack<number>();

function isInSetupMode(): boolean {
  return GameMode.Setup === $gameStore.gameMode;
}

function isFinished(): boolean {
  return GameMode.Finished === $gameStore.gameMode;
}

function isPlayer1(): boolean {
   return Players.Player1 === $gameStore.currentPlayer;
}

$: isEnteredScorePlayer1Invalid = parseInt($gameStore.player1.enteredScore, 10) > $gameStore.player1.carambolesLeft;
$: isEnteredScorePlayer2Invalid = parseInt($gameStore.player2.enteredScore, 10) > $gameStore.player2.carambolesLeft;


function handleKeyPress(event) {
  console.log(event);
  if (isInSetupMode()) {
    return;
  }

  if (isFinished()) {
    if (!isShiftSPressed(event)) {
      return;
    } else {
      console.log('starting new game');
      gameStore.newGame();
    }
  }

  if (isShiftSPressed(event)) {
    console.log('starting new game');
    gameStore.newGame();
  }

  if (isBackspacePressed(event)) {
    if (isPlayer1() && !currentScorePlayer1.isEmpty()) {
      currentScorePlayer1.pop();
      gameStore.enteringScore(currentScorePlayer1.toString());
    } else if (!currentScorePlayer2.isEmpty()) {
      currentScorePlayer2.pop();
      gameStore.enteringScore(currentScorePlayer2.toString());
    }  
  }
  
  if (isEnterPressed(event)) {
    if (isPlayer1()) {
      const score = parseInt(currentScorePlayer1.toString(), 10);
      if (score > game.player1.carambolesLeft) {
        return;
      }
      gameStore.submitScore(score);
      currentScorePlayer2  = new Stack<number>();
    } else {
      const score = parseInt(currentScorePlayer2.toString(), 10);
      if (score > game.player2.carambolesLeft) {
        return;
      }
      gameStore.submitScore(score);
      currentScorePlayer1  = new Stack<number>();
    }  
  }
  if (isNumberPressed(event)) {
    if (isPlayer1()) {
      currentScorePlayer1.push(event.key);
      gameStore.enteringScore(currentScorePlayer1.toString());
    } else {
      currentScorePlayer2.push(event.key);
      gameStore.enteringScore(currentScorePlayer2.toString());
    }
  }
}
</script>

<style lang="scss">
    .grid-cell-content {
      @apply flex justify-center items-center;
    }
</style>

<svelte:window on:keydown={handleKeyPress}/>

<section class="h-full grid grid-cols-3 justify-items-center text-gray-100">
  <!-- RIJ 1 spelersnamen-->
  <GridCell>
    <div 
      class="grid-cell-content  w-4/5 h-4/5 text-6xl font-bold"
      class:bg-red-700="{game.player1.player === game.currentPlayer && GameMode.InProgress === game.gameMode}">
      {game.player1.name}
   </div>

  </GridCell>

  <GridCell><div class="w-full h-full bg-contain bg-center bg-no-repeat" style="background-image: url('./images/bonanza.jpg')"></div></GridCell>
  <GridCell>
    <div 
    class="grid-cell-content  w-4/5 h-4/5 text-6xl font-bold"
    class:bg-red-700="{game.player2.player === game.currentPlayer && GameMode.InProgress === game.gameMode}">
    {game.player2.name}
  </div>
  </GridCell>


  <!-- RIJ 2 te maken caramboles-->
  <GridCell borderStyle="solid">
    <div class="grid-cell-content text-green-500 text-6xl font-bold">{game.player1.totalCaramboles} / {game.player1.carambolesToMake}</div>
  </GridCell>
  <GridCell borderStyle="solid">
    <div class="grid-cell-content text-green-500 text-6xl font-bold">Caramboles</div>
  </GridCell>
  <GridCell borderStyle="solid">
    <div class="grid-cell-content text-green-500 text-6xl font-bold">{game.player2.totalCaramboles} / {game.player2.carambolesToMake}</div>
  </GridCell>

  <!-- RIJ 3 totaal gemaakte caramboles-->
  <GridCell borderStyle="solid">
    <div class="grid-cell-content text-yellow-500 text-11xl font-bold h-full leading-none"
      class:text-yellow-500="{!isEnteredScorePlayer1Invalid}"
      class:text-red-500="{isEnteredScorePlayer1Invalid}"
    >{game.player1.enteredScore}</div>
  </GridCell>
  <!-- @Emile: je kunt ook nog e.g. borderColor="red-300" borderSize="{8}" invullen -->
  <GridCell borderStyle="solid">
    <div class="grid-cell-content flex-col text-blue-500 text-6xl font-bold h-full leading-none">
      {#if game.lastTurn}<span class="text-red-600">gelijkmakende&nbsp;</span>{/if}
      {#if game.gameMode === GameMode.Finished }
      Spel afgelopen <img src="images/finish-line-flag.svg" class="w-14 h-14" alt="Einde spel" />
      {/if}
      <span>Beurt {Math.round(game.turn / 2)}</span>
    </div>    
  </GridCell>
  <GridCell borderStyle="solid">
    <div class="grid-cell-content text-11xl font-bold h-full leading-none"
    class:text-yellow-500="{!isEnteredScorePlayer2Invalid}"
    class:text-red-500="{isEnteredScorePlayer2Invalid}">{game.player2.enteredScore}</div>
  </GridCell>

  <!-- RIJ 4 gemiddelde van gemaakte caramboles-->
  <GridCell>
    <div class="grid-cell-content text-6xl font-bold">{game.player1.averageCaramboles.toFixed(3)}</div>
  </GridCell>
  <GridCell>
    <div class="grid-cell-content text-6xl font-bold">Gemiddelde</div>
  </GridCell>
  <GridCell>
    <div class="grid-cell-content text-6xl font-bold">{game.player2.averageCaramboles.toFixed(3)}</div> 
  </GridCell>

  <!-- RIJ 5 hoogste score -->
  <GridCell>
    <div class="grid-cell-content text-5xl font-bold">{game.player1.highestSerie}</div>
  </GridCell>
  <GridCell>
    <div class="grid-cell-content text-5xl font-bold">Hoogste serie</div>
  </GridCell>
  <GridCell>
    <div class="grid-cell-content text-5xl font-bold">{game.player2.highestSerie}</div> 
  </GridCell>

  <!-- RIJ 6  aantal gemaakte poedels -->
  <GridCell>
    <div class="grid-cell-content text-5xl font-bold">{game.player1.numberOfPoedels}</div>
  </GridCell>
  <GridCell>
    <div class="grid-cell-content text-5xl font-bold">Aantal poedels</div>
  </GridCell>
  <GridCell>
    <div class="grid-cell-content text-5xl font-bold">{game.player2.numberOfPoedels}</div>
  </GridCell>

  <div/>
</section>