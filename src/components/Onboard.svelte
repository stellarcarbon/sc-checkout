<script>
    import {
      Content,
      Grid,
      Row,
      Column,
      Checkbox,
      Button,
    } from "carbon-components-svelte";

    let termsAgreed = false;
</script>

  <Content id="onboard">
    <Grid>
      <Row>
        <Column>
          <h1>Welcome</h1>
        </Column>
      </Row>
      <Row>
        <Column>
          <p>Please connect your wallet to continue</p>
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
          <Button disabled={!termsAgreed}>Connect</Button>
        </Column>
      </Row>
    </Grid>
  </Content>