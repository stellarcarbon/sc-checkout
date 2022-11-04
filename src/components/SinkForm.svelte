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
      FormGroup,
      Slider,
    } from "carbon-components-svelte"

    import { SinkStore } from "../stores"
    import Connect from "./Connect.svelte";

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

<Form>
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
    
</Form>