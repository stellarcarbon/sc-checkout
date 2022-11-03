<script>
    import {
      Content,
      SkeletonPlaceholder,
      Truncate,
      FluidForm,
      TextInput,
    } from "carbon-components-svelte";
    import App from "../App.svelte";

    let pubkey = "GAVF6ZB7Z7FKCWM5HEY2OV4ENPK3OSSHMFTVR4HHSBFHKW36U3FUH2CB";
    let userName = "";
    let userEmail = "";
    let emailInvalid = false;

    $: emailInvalid = userEmail && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
</script>

  <Content id="connect-start">
    <h2>Connect your wallet</h2>
    <SkeletonPlaceholder />
    <a href="#">Wallet Connect v2 URI</a>
  </Content>

  <Content id="connect-done">
    <SkeletonPlaceholder />
    <h3>Done</h3>
    <Truncate>You've successfully connected {pubkey}.</Truncate>
  </Content>

  <Content id="contact-info">
    <p>Provide your name and email for later:</p>
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
    </FluidForm>
  </Content>