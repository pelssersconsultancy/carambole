<script lang="typescript">
import { isEmpty, isPositiveNumber } from '../helpers/validation';
import Modal from "../UI/Modal.svelte";
import TextInput from "../UI/TextInput.svelte";
import Button from "../UI/Button.svelte";
import { gameStore } from './game.store';
import type { Player } from './game';
import { isEnterPressed, isShiftSPressed } from '../helpers/keyhelpers';

  let player1Name: string = $gameStore.player1.name;
  let player1Caramboles: number = $gameStore.player1.carambolesToMake;
  let player2Name: string = $gameStore.player2.name;
  let player2Caramboles: number =  $gameStore.player2.carambolesToMake;

  $: player1NameValid = !isEmpty(player1Name);
  $: player1CarambolesValid = isPositiveNumber(player1Caramboles);
  $: player2NameValid = !isEmpty(player2Name);
  $: player2CarambolesValid = isPositiveNumber(player2Caramboles);

  $: formIsValid = player1NameValid && player1CarambolesValid && player2NameValid && player2CarambolesValid;

  function submitForm() {
     if (!formIsValid) {
       return;
     }
     const player1: Partial<Player> = { name: player1Name, carambolesToMake: player1Caramboles };
     const player2: Partial<Player> = { name: player2Name, carambolesToMake: player2Caramboles };
     gameStore.initializeGame(player1, player2);
  }

  function switchPlayers() {
    console.log('switching players');
    const player1NameOld = player1Name;
    const player1CarambolesOld = player1Caramboles;
    const player2NameOld = player2Name;
    const player2CarambolesOld = player2Caramboles;
    player1Name = player2NameOld;
    player1Caramboles = player2CarambolesOld;
    player2Name = player1NameOld;
    player2Caramboles = player1CarambolesOld;
  }

  function handleKeyDown(event): void {
    console.log('SetupGame handling',event);
    if (isEnterPressed(event)) {
       submitForm();
     }
     if (isShiftSPressed(event)) {
      switchPlayers();
     }
  }
</script>
<svelte:window on:keydown={handleKeyDown}/>
<Modal title="Stel spelers in">
  <form on:submit={submitForm}>
    <p>Speler 1</p>
    <div class="p-2 mt-2 mb-2 bg-gray-300 border-4">
      <TextInput
      id="player1Name"
      label="Naam"
      valid={player1NameValid}
      validityMessage="Naam van speler mag niet leeg zijn"
      value={player1Name}
      on:input={event => (player1Name = event.target.value)} />
    <TextInput
      id="player1Caramboles"
      label="Te maken Caramboles"
      type="number"
      valid={player1CarambolesValid}
      validityMessage="Het aantal te maken caramboles moet een positief getal zijn"
      value={player1Caramboles}
      on:input={event => (player1Caramboles = parseInt(event.target.value, 10))} />  
    </div>
    <p>Speler 2</p>
    <div class="p-2 mt-2 bg-gray-300 border-4">
      <TextInput
      id="player2Name"
      label="Naam"
      valid={player2NameValid}
      validityMessage="Naam van speler mag niet leeg zijn"
      value={player2Name}
      on:input={event => (player2Name = event.target.value)} />

    <TextInput
      id="player2Caramboles"
      label="Te maken Caramboles"
      type="number"
      valid={player2CarambolesValid}
      validityMessage="Het aantal te maken caramboles moet een positief getal zijn"
      value={player2Caramboles}
      on:input={event => (player2Caramboles = parseInt(event.target.value, 10))} />
      <div>
  </form>
  <div slot="footer">
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Start Spel [Enter]
    </Button>
    <Button type="button" on:click={switchPlayers}  disabled={!formIsValid}>
      Switch spelers [Shift+s]
    </Button>
  </div>
</Modal>