<script lang="ts">
    import {
      Header,
      HeaderNav,
      HeaderNavItem,
      HeaderNavMenu,
      SideNav,
      SideNavItems,
      SideNavMenu,
      SideNavMenuItem,
      SideNavLink,
      SideNavDivider,
      SkipToContent,
      Content,
    } from "carbon-components-svelte"

    import {SinkStore} from "../stores"
    import Onboard from "./Onboard.svelte"
    import Connect from "./Connect.svelte"
    import SinkForm from "./SinkForm.svelte";

    console.log($SinkStore)
  
    let isSideNavOpen = false
</script>
  
  <Header company="stellarcarbon" platformName="Offset" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
  </Header>
  
  <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
      <SideNavLink href="#onboard" text="Onboard" />
      <SideNavDivider />
      <SideNavLink href="#connect-start" text="Connect-start" />
      <SideNavLink href="#connect-done" text="Connect-done" />
      <SideNavLink href="#contact-info" text="Contact-info" />
      <SideNavDivider />
      <SideNavLink text="Offset form" />
    </SideNavItems>
  </SideNav>
  
  <Content>
    {#if $SinkStore.onboarded === false}
        <Onboard />
    {:else if !$SinkStore.userEmail}
        <Connect />
    {:else}
        <SinkForm />
    {/if}
  </Content>
