<script>
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
    } from "carbon-components-svelte";

    import Onboard from "./Onboard.svelte";
    import Connect from "./Connect.svelte"
  
    let isSideNavOpen = false;
</script>
  
  <Header company="stellarcarbon" platformName="Offset" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent href="#onboard" />
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
  
  <Onboard />
  <Connect />