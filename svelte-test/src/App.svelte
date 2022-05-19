<script>
	let counter = 0
	$: counterClass = counter % 2 === 0 ? 'red' : 'blue'
	let name = 'Svelte';
	$: lowerName = name.toLowerCase()
	$: endLetterUp = name ? name.slice(0, name.length - 1) + name[name.length -1].toUpperCase() : ''

	let pos = {
		x: 0,
		y: 0
	}

	let inputValue = ''
	let agree = true
	let text = ''
	let select = '1'
	let sex = 'male'
	// let num = 42
	// let src = "https://i.ytimg.com/vi/qqt6YxAZoOc/maxresdefault.jpg"
	// let altText = 'Rich Harris'
	// let htmlString = '<b>This is strong text</b> with <em>italic text</em>'

	function changeNameHandler() {
		name = 'New Name'
	}
	function mousemoveHandler(e) {
		pos.x = e.x
		pos.y = e.y
	}
	function submitHandler(e) {
		// e.preventDefault()
		console.log('inputValue: ', inputValue);
	}

	function bindName(e) {
		name = e.target.value
	}


</script>

<main>
	<h1>Hello {name}!</h1>
	<input type="text" bind:value={name} />
	<hr>
	<input type="checkbox" bind:checked={agree}> {agree}
	<hr>
	<textarea bind:value={text}></textarea> 
	<div style="white-space: pre-wrap">{text}</div>
	<hr>
	<select bind:value={select}>
		<option value="0">Option 0</option>
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
	</select>
	<hr>
	<input type="radio" value="female" bind:group={sex} /> Female
	<input type="radio" value="male" bind:group={sex} /> Male
	<br>
	Sex: {sex}




	<!-- <h2>{lowerName}</h2> -->
	<!-- <h3>{endLetterUp}</h3> -->
	<!-- <p></p>
	<h2>{(Math.random() * num).toFixed()}</h2>
	<img src={src} alt={altText} />
	<p>{@html htmlString}</p> -->
	<!-- <button on:click={changeNameHandler}>Change name</button> -->
	<!-- <h1 class={counterClass}>Counter: {counter}</h1> -->
	<!-- <button on:click={() => counter++}>+ 1</button> -->

	<!-- <div class="playground" on:mousemove={mousemoveHandler}>
		<h2>X: {pos.x}, Y: {pos.y}</h2>
	</div> -->

	<!-- <form on:submit|preventDefault|once={submitHandler}>
		<input type="text" on:input={e => (inputValue = e.target.value)}>
		<button type="submit">Send form</button>
	</form> -->

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	img {
		width: 300px;
		height: auto;
	}
	.playground {
		width: 400px;
		height: 200px;
		padding: 1rem;
		margin-bottom: 1rem;
		border: 1px solid black;
	}
	.red {
		color: red;
		font-size: 2rem;
		font-weight: 700;
	}
	.blue {
		color: blue;
		font-size: 2rem;
		font-weight: 900;
	}
</style>