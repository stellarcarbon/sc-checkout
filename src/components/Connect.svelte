<script>
    import {
      Tile,
      SkeletonPlaceholder,
      Truncate,
      FluidForm,
      TextInput,
      Button,
    } from "carbon-components-svelte"

    import { SinkStore } from "../stores"

    let userName = ""
    let userEmail = ""
    let emailInvalid = false

    const handleConnect = () => {
      SinkStore.update((sink) => {
            return {...sink, pubkey: "GAVF6ZB7Z7FKCWM5HEY2OV4ENPK3OSSHMFTVR4HHSBFHKW36U3FUH2CB"}
        });
        console.log($SinkStore)
    }
    const handleSave = () => {
      SinkStore.update((sink) => {
            return {...sink, userName: userName, userEmail: userEmail || "left@blank.xyz"}
        });
        console.log($SinkStore)
    }

    $: emailInvalid = userEmail && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
</script>

  {#if !$SinkStore.pubkey}
    <h2>Connect your wallet</h2>
    <SkeletonPlaceholder />
    <a href="#">Wallet Connect v2 URI</a>
    <Button on:click={handleConnect}>*connected</Button>
  {:else}
    <SkeletonPlaceholder />
    <h3>Done</h3>
    <Truncate>You've successfully connected {$SinkStore.pubkey}.</Truncate>

    <Tile>
      <p>Provide your name and email for later:</p>
    </Tile>
    <FluidForm>
      <TextInput 
        bind:value={userName}
        labelText="Your name"
        helperText="Providing your name is entirely optional."
        placeholder="Enter your name..."
      />
      <TextInput 
        bind:value={userEmail}
        invalid={emailInvalid}
        invalidText="This email address contains errors. Please enter a valid email address."
        labelText="Your email"
        helperText="An email address is required to obtain a certificate from Verra."
        placeholder="Enter your email..."
      />
      <Button on:click={handleSave} disabled={emailInvalid}>Save</Button>
    </FluidForm>
  {/if}