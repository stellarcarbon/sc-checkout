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
    import DeliveryTruck from "carbon-pictograms-svelte/lib/DeliveryTruck.svelte"
    import Earth from "carbon-pictograms-svelte/lib/Earth.svelte";
    import PragueDancingHouse_02 from "carbon-pictograms-svelte/lib/PragueDancingHouse_02.svelte"

    import { SinkStore } from "../stores"

    const apiUrl = "https://api-beta.stellarcarbon.io"
    async function getQuote(amount) {
        const res = await fetch(`${apiUrl}/carbon-quote?carbon_amount=${amount}`)
        const quote = await res.json()

        if (res.ok) {
            return quote
        } else {
            throw new Error(quote.detail[0].msg)
        }
    }
    $: quotePromise = getQuote($SinkStore.carbonAmount)

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
              
                <button on:click={memoEarth}><Earth /></button>
                <button on:click={memoHouse} size="small"><PragueDancingHouse_02 /></button>
                <button on:click={memoAir} size="small"><Airplane /></button>
                <button on:click={memoRoad} size="small"><DeliveryTruck /></button>
            </ButtonSet>
        </Tile>
        <Tile>
            <p>or provide your own message:</p>
            <TextInput bind:value={$SinkStore.memo} />
        </Tile>
    </FormGroup>
    <Button>Sign &amp; submit</Button>
</Form>
