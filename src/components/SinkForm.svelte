<script lang="ts">
    import {
      Grid,
      Row,
      Column,
      Tile,
      SkeletonPlaceholder,
      Form,
      TextInput,
      Button,
      ButtonSet,
      FormGroup,
      Slider,
      InlineLoading,
    } from "carbon-components-svelte"

    import Airplane from "carbon-pictograms-svelte/lib/Airplane.svelte";
    import DeliveryTruck from "carbon-pictograms-svelte/lib/DeliveryTruck.svelte";
    import Sustainability from "carbon-pictograms-svelte/lib/Sustainability.svelte";
    import HomeFront from "carbon-pictograms-svelte/lib/HomeFront.svelte";

    import { get } from 'svelte/store';
    import {SinkStore, WalletStore} from "../stores";
    import { CarbonService } from "../client";

    $: quotePromise = CarbonService.getCarbonQuoteCarbonQuoteGet({
      carbonAmount: $SinkStore.carbonAmount
    })

    const memoEarth = () => {
      SinkStore.update((sink) => {
        return {...sink, memo: "🌎✨🌍💕🌏"}
      });
    }
    const memoHouse = () => {
      SinkStore.update((sink) => {
        return {...sink, memo: "🏠 household"}
      });
    }
    const memoAir = () => {
      SinkStore.update((sink) => {
        return {...sink, memo: "✈️ air travel"}
      });
    }
    const memoRoad = () => {
      SinkStore.update((sink) => {
        return {...sink, memo: "🛣️ road travel"}
      });
    }

    let submitState: "active" | "inactive" | "finished" | "error" = "inactive"
    let submitDescription = "Building transaction..."
    const handleSink = async () => {
      submitState = "active"
      const walletKit = get(WalletStore)
      let email = $SinkStore.userEmail
      if ($SinkStore.userName) {
        email = `${$SinkStore.userName} <${$SinkStore.userEmail}>`
      }
      try {
        const sinkResp = await CarbonService.buildSinkCarbonXdrSinkCarbonXdrPost({
          funder: $SinkStore.pubkey,
          carbonAmount: $SinkStore.carbonAmount,
          memoValue: $SinkStore.memo,
          email: email
        })
        submitDescription = "Waiting for wallet..."
        const signedXDR = await walletKit.sign({
          xdr: sinkResp.tx_xdr,
          publicKey: $SinkStore.pubkey
        })
        submitState = "finished"
        submitDescription = "That's it for now. Tx submission not implemented."
      } catch (error) {
        submitState = "error"
        console.error(error)
      }
    }

</script>

<Grid>
    <Row>
        <Column><SkeletonPlaceholder /></Column>
        <Column>
            <em>VCS Project 1360</em>
            <p>Shipibo Conibo and Cacataibo Indigenous Communities in Ucayali, Peru.</p>
        </Column>
    </Row>
</Grid>

<Tile>
    <p>How much would you like to offset?</p>
</Tile>

<Form on:submit={(e) => {
    e.preventDefault();
    console.log("submit", e);
  }}>
    <FormGroup legendText="Amount">
        <Slider
            bind:value={$SinkStore.carbonAmount}
            labelText="CARBON (in tonnes CO2-equivalent: tCO₂-e)"
            min={1}
            max={120}
        />
        {#await quotePromise}
            <p>The total cost is US $...</p>
        {:then quote} 
            <p>The total cost is US <strong>$ {parseFloat(quote.total_cost).toFixed(2)}</strong></p>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </FormGroup>
    <FormGroup>
        <Tile>
            <p>Select a reason</p>
            <ButtonSet>              
                <button on:click={memoEarth}><Sustainability /></button>
                <button on:click={memoHouse}><HomeFront /></button>
                <button on:click={memoAir}><Airplane /></button>
                <button on:click={memoRoad}><DeliveryTruck /></button>
            </ButtonSet>
        </Tile>
        <Tile>
            <p>or provide your own message:</p>
            <TextInput bind:value={$SinkStore.memo} />
        </Tile>
    </FormGroup>
    {#if submitState !== "inactive"}
      <InlineLoading status={submitState} description={submitDescription} />
    {:else}
      <Button on:click|once={handleSink} >Sign &amp; submit</Button>
    {/if}
</Form>
