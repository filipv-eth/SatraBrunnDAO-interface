<script>
	import CollapsibleSection from './CollapsibleSection.svelte'
</script>

<section>
<CollapsibleSection headerText={'Collapse or Expand me'} >
	<div class="content">
			Look at all this fun content
	</div>
</CollapsibleSection>
	
<CollapsibleSection headerText={'Collapse or Expand me'} >
	Look at all this fun content
</CollapsibleSection>
</section>

<style>
	section {
		width: 500px;
	}
	
	.content {
		background-color: #f4f4f4;
		padding: 0.5em;
	}
</style>