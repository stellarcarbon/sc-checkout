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
      Select,
      SelectItem,
      InlineNotification,
    } from "carbon-components-svelte"

    import Airplane from "carbon-pictograms-svelte/lib/Airplane.svelte";
    import DeliveryTruck from "carbon-pictograms-svelte/lib/DeliveryTruck.svelte";
    import Sustainability from "carbon-pictograms-svelte/lib/Sustainability.svelte";
    import HomeFront from "carbon-pictograms-svelte/lib/HomeFront.svelte";

    import { get } from 'svelte/store';
    import { SinkStore, WalletStore } from "../stores";
    import { ApiError, CarbonService, PaymentAsset, type OpenAPIConfig } from "../client";
    import { request as __request } from "../client/core/request";

    let carbonAmount = get(SinkStore).carbonAmount
    $: quotePromise = CarbonService.getCarbonQuoteCarbonQuoteGet({
      carbonAmount: carbonAmount
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
    let submitErrors = []
    const handleSink = async () => {
      submitState = "active"
      const walletKit = get(WalletStore)

      SinkStore.update((sink) => {
        return {...sink, carbonAmount: carbonAmount}
      });
      let email = $SinkStore.userEmail
      if ($SinkStore.userName) {
        email = `${$SinkStore.userName} <${$SinkStore.userEmail}>`
      }
      try {
        const sinkResp = await CarbonService.buildSinkCarbonXdrSinkCarbonXdrPost({
          funder: $SinkStore.pubkey,
          carbonAmount: $SinkStore.carbonAmount,
          paymentAsset: $SinkStore.paymentAsset,
          memoValue: $SinkStore.memo,
          email: email
        })
        submitDescription = "Waiting for wallet..."
        const { signedXDR } = await walletKit.sign({
          xdr: sinkResp.tx_xdr,
          publicKey: $SinkStore.pubkey
        })
        submitDescription = "Submitting to Horizon..."
        console.log(signedXDR)
        const horizonApi: OpenAPIConfig = {
          BASE: "https://horizon.stellar.org",
          VERSION: "latest",
          WITH_CREDENTIALS: false,
          CREDENTIALS: 'omit'
        }
        const horizonResp = await __request(
          horizonApi, {
            method: 'POST',
            url: '/transactions',
            query: {
                'tx': signedXDR,
            },
            errors: {
                400: `Transaction Failed`,
                504: `Timeout`,
            },
          }
        )
        console.log(horizonResp)
        submitState = "finished"
        submitDescription = `All done: ${horizonResp.id}`
      } catch (error) {
        submitState = "error"
        console.error(error.name, error.message)
        if (error instanceof ApiError){
          console.log(error.request)
          console.log(error.body)
          submitErrors = error.body.detail.map(
            ({msg}) => msg
          )
        }
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
    // console.log("submit", e);
  }}>
    <FormGroup legendText="Amount">
        <Slider
            bind:value={carbonAmount}
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
        <p>How would you like to pay?</p>
        <Select 
          helperText="Note: payment will default to CARBON if a sufficient balance is available." 
          labelText="Payment asset"
          bind:selected={$SinkStore.paymentAsset}
        >
          {#each Object.values(PaymentAsset) as asset}
            <SelectItem value={asset} text={asset} />
          {/each}
        </Select>
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
      {#if submitState === "error"}
        {#each submitErrors as errorMsg}
          <InlineNotification
            title="Error:"
            subtitle={errorMsg}
          />
        {/each}
      {/if}
      <InlineLoading status={submitState} description={submitDescription} />
    {:else}
      <Button on:click|once={handleSink}>Sign &amp; submit</Button>
    {/if}
</Form>
