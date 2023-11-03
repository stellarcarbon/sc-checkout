<script lang="ts">
    import {
      Grid,
      Row,
      Column,
      Checkbox,
      Button,
      RadioButtonGroup,
      RadioButton,
      InlineNotification,
      Link,
    } from "carbon-components-svelte";

    import { StellarWalletsKit, WalletNetwork, WalletType } from 'stellar-wallets-kit';

    import {SinkStore, WalletStore} from "../stores"

    let supportedWallets = StellarWalletsKit.getSupportedWallets();
    let userWallet = WalletType.ALBEDO;
    const handleWallet = (walletType: WalletType) => {
      userWallet = walletType;
    }

    let termsAgreed = false;
    const handleConnect = async () => {
        let walletKit = new StellarWalletsKit({
          selectedWallet: userWallet, 
          network: WalletNetwork.PUBLIC
        });
        let walletAddress = "";
        if (userWallet === WalletType.WALLET_CONNECT){
          // await kit.startWalletConnect ...
        } else {
          walletAddress = await walletKit.getPublicKey().catch((error) => {
            console.error(error);
            return ""
          });
        }
        WalletStore.set(walletKit);
        SinkStore.update((sink) => {
          return {...sink, onboarded: true, pubkey: walletAddress}
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
        {#await supportedWallets then wallets}
          <RadioButtonGroup 
            orientation="vertical"
            legendText="Supported wallets:" 
            bind:selected={userWallet}
          >
            {#each wallets as wallet}
              <RadioButton labelText={wallet.name} value={wallet.type} disabled={!wallet.isAvailable} />
            {/each}
          </RadioButtonGroup>
        {:catch error} 
          <InlineNotification title="Error loading available wallets:" subtitle={error.msg} />
        {/await}
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