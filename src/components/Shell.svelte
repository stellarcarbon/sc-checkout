<script lang="ts">
    import {
      Header,
      SkipToContent,
      Content,
    } from "carbon-components-svelte"

    import {SinkStore} from "../stores"
    import Onboard from "./Onboard.svelte"
    import Connect from "./Connect.svelte"
    import SinkForm from "./SinkForm.svelte";

    console.log($SinkStore)
  
</script>
  
  <Header company="Stellarcarbon" platformName="Sink">
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
  </Header>
  
  <Content>
    {#if $SinkStore.onboarded === false}
        <Onboard />
    {:else if !$SinkStore.userEmail}
        <Connect />
    {:else}
        <SinkForm />
    {/if}
  </Content>