<script lang="ts">
import Header from "./UI/Header.svelte";
import GameGrid from "./game/GameGrid.svelte";
import SetupGame from './game/SetupGame.svelte';
import { GameMode } from './game/game';
import { gameStore} from './game/game.store';

$: isInSetupMode = GameMode.Setup === $gameStore.gameMode;
</script>

<Header />

<main class="h-screen mt-16 mb-16">
  {#if isInSetupMode}
  <SetupGame></SetupGame>    
  {:else}  
  <GameGrid game={$gameStore}/>
  {/if}
</main>

<section id="debug" class="bg-white"><pre> {JSON.stringify($gameStore, undefined, 4) }</pre></section>