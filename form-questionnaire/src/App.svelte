<script>
import { debug, text } from "svelte/internal";

	export let name;
	let answer = '';
	let caption = 'Название опроса'
	let namechapter = ''
	let chapters = []
	let questions = []
	let selected
	let typefields = [
		{id: 1, text: 'Текстовое'},
		{id: 2, text: 'Список'},
		{id: 3, text: 'Чекбокс'},
		{id: 4, text: 'Да/Нет'}
	]

	// let question = {
	// 	// title: '',
	// 	questions: [
	// 		{
	// 			caption: '',
	// 			description: '',
	// 			control: '',
	// 			val: ''
	// 		}
	// 	]		
	// } 

	function addChapter(e) {
		if (!namechapter) return
		let question = {
			title: namechapter,
			questions: [
			{
				caption: '',
				description: '',
				control: '',
				val: ''
			}
		]	
		}
		question = question
		chapters.push(question)
		chapters = chapters
		namechapter = ''
	}

	function delChapter(e) {
		chapters.filter(ch => ch !== 1)
		chapters = chapters
	}

	function changeTypeField(e) {
		console.log('Selected: ', selected);		
	}

	function editChapter(e) {
		
	}

	function addQuestion(e) {
		
	}

	function delQuestion(e) {
		
	}
	function handleSubmit(e) {
		
	}
</script>

<main>
	<div class="container">
		<section class="header">
			<h3>Мастер создания опросника</h3>
			<hr>
		</section>
		<form on:submit|preventDefault={handleSubmit}>
			<section class="theme">
				<span>Название:</span>
				<input type="text" bind:value={caption}>			
				
				
			</section>
			<section class="chapter">
				<section class="add-chapter">
					<section>
						<span>Раздел:</span>
						<input type="text" bind:value={namechapter}>
					</section>
					<section>
						<input type="button" value="Добавить" on:click={addChapter} class="btn-chapter">					
					</section>
				</section>
				{#each chapters as chapter}

					<!-- <section class="add-chapter"> -->
						<!-- <input type="text" bind:value={chapter} disabled id={chapter}> -->
						<!-- <span class="title">{chapter}</span>
						<section>
							<input type="button" value="Редактировать" on:click={editChapter} class="btn-chapter">
							<input type="button" value="Удалить" on:click={delChapter} class="btn-chapter">
						</section>
					</section> -->
					
					<section class="add-question">
						<section class="quest">
							<section>
								<label>Вопрос:					
									<!-- <input type="text" bind:value={question.caption}> -->
								</label>
							</section>
							<section>
								<span>Доп. описание:</span>					
								<!-- <textarea type="text" bind:value={question.description}></textarea> -->
							</section>
							<section>
								<span>Тип поля ответа:</span>					
								<select bind:value={selected} on:change={changeTypeField}>
									{#each typefields as type}
										<option value={type}>{type.text}</option>
									{/each}
								</select>
							</section>
						</section>
						<section>
							<input type="button" value="Добавить" on:click={addQuestion}>
							<input type="button" value="Удалить" on:click={delQuestion}>
						</section>
					</section>	
					
				{/each}
			</section>

			<button  type=submit>
				Записать
			</button>
		</form>
	</div>
	<div class="view">
		{#each chapters as chapter, i}
			
		 {@debug chapters}
			<div class="result">
				<p class="result-caption">{caption}</p>
				<div class="employee">
					<p class="empl-data">
						<span>Сотрудник:</span>
						<span>Иванов Иван Иванович</span>
					</p>
					<p>
						<span>Шаг:</span>
						<span>{i + 1}</span>
						<span>из</span>
						<span>{chapters.length}</span>
					</p>
				</div>
				<hr class="hr" />
				<p class="title-chapter">{chapter.title}</p>
				<section class="res-chapter">
					<!-- {#each  as }
						
					{/each} -->
				</section>
			</div>

		{/each}
		

		

	</div>
</main>

<style>
	main {
		display: flex;
		/* flex-direction: column; */
		justify-content: space-around;
		height: 100vh;			
	}

	p {
		margin: 0;
		padding: 0;
	}
	

	.container {
		display: flex;
		align-self: center;
		flex-direction: column;	
		background-color: rgb(250, 250, 250);
		width: 500px;
		height: 700px;
		border: 1px solid #ccc;
		border-radius: 5px;
		overflow: auto;
	}

	.view {
		/* align-self: center; */
		overflow: auto;
	}

	.title-chapter {
		text-align: center;
		color: rgb(182, 182, 182);
		margin-bottom: 15px;
	}

	.result {
		/* display: flex; */
		align-self: center;
		background-color: rgb(250, 250, 250);
		width: 700px;
		height: 500px;
		border: 1px solid #ccc;
		border-radius: 5px;
		overflow: auto;
		margin-bottom: 10px;
	}

	.result-caption {
		margin: 10px;
		font-weight: 700;
		font-size: 1.6rem;
	}

	.employee {
		display: flex;
		justify-content: space-between;
		margin: 5px 25px ;
	}

	.empl-data {
		color: rgb(182, 182, 182);
	}

	.hr {
		padding-left: 5px;
	}

	.res-chapter {
		overflow: auto;
	}

	.add-question {
		display: flex;
		justify-content: space-between;
	}

	.quest {
		flex: 2;
	}

	.title {
		font-weight: 700;
		font-size: 1.5rem;
	}
	
	.header {
		background-color: yellow;
		/* margin-bottom: 20px; */
	}

	.btn-chapter {
		border-radius: 5px;
	}

	.btn-chapter:hover {
		background-color: rgb(154, 186, 253);
	}
	
	
	.add-chapter {
		display: flex;
		justify-content: space-around;
		margin-top: 15px;
		margin-bottom: 15px;
	}

	hr {
		margin: 0;
	}

	.theme {
		background-color: rgb(184, 184, 252);
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
</style>