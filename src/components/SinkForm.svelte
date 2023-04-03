<script>
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
    } from "carbon-components-svelte"

    import Airplane from "carbon-pictograms-svelte/lib/Airplane.svelte";
    import DeliveryTruck from "carbon-pictograms-svelte/lib/DeliveryTruck.svelte";
    import Sustainability from "carbon-pictograms-svelte/lib/Sustainability.svelte";
    import HomeFront from "carbon-pictograms-svelte/lib/HomeFront.svelte";

    import { SinkStore } from "../stores";
    import { CarbonService } from "../client";

    $: quotePromise = CarbonService.getCarbonQuoteCarbonQuoteGet($SinkStore.carbonAmount)

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
    <Button>Sign &amp; submit</Button>
</Form>
