<script lang="ts">
    import {
      Grid,
      Row,
      Column,
      Checkbox,
      Button,
      UnorderedList,
      ListItem,
      Link,
    } from "carbon-components-svelte";

    import { StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';

    import {SinkStore} from "../stores"

    let supportedWallets = StellarWalletsKit.getSupportedWallets();
    let userWallet = WalletType.ALBEDO;
    const handleWallet = (walletType) => {
      userWallet = walletType;
    }
    console.log(supportedWallets)

    let termsAgreed = false;
    const handleConnect = () => {
        SinkStore.update((sink) => {
            return {...sink, onboarded: true}
        });
        console.log($SinkStore)
    }
</script>

  <Grid>
    <Row>
    <Column>
        <h1>Welcome</h1>
    </Column>
    </Row>
    <Row>
    <Column>
        <p>Please connect your wallet to continue</p>
        <UnorderedList>
          {#each supportedWallets as wallet}
            <ListItem>
              <Link href="#0" on:click={() => handleWallet(wallet.type)}>{wallet.name}</Link>
            </ListItem>
          {/each}
        </UnorderedList>
    </Column>
    </Row>
    <Row>
    <Column>
      <Checkbox 
        labelText="By connecting your wallet you agree with our Terms of Use and Privacy Policy"
        bind:checked={termsAgreed} 
      />
    </Column>
    </Row>
    <Row>
    <Column>
        <Button disabled={!termsAgreed} on:click={handleConnect}>Connect</Button>
    </Column>
    </Row>
  </Grid>