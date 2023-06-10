import React, {useState, useEffect} from "react";

const api = "https://assets.breatheco.de/apis/fake/todos/user/julitar"

//create your first component
const Home = () => {
		const [ tarea, setTarea] = useState([])
		const [inputValue, setInputValue] = useState("")

	useEffect(() => {
		fetch(api, {
			method: "GET"
		  })
		.then(response => response.json())
		.then(response => {
			setTarea(response)
		})
		.catch(error => console.log(error));
	}, [])	

	const updateList = () => {
		const options = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(tarea)
		}
		
		fetch(api, options)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(error => console.error(error));
	}

	useEffect(() => {
		updateList()
	}, [tarea])

	const addToDo = () => {
		const newToDo = {label: inputValue, done: false}
		const updateTarea = [...tarea]
		updateTarea.push(newToDo)
		setTarea(updateTarea)
		setInputValue('')
	}
	
	/*
	const deleteToDo = (index) => {

	}
*/

	return (
		<>	
			<div className="row justify-content-center">
				<div className="col-6 mt-5 text-center display-4 text-success">
					<h1>To do List</h1>
				</div>

				<figure className="text-center mb-5">
					<blockquote className="blockquote">
						<p>“If it weren’t for the last minute, nothing would get done”</p>
					</blockquote>
					<figcaption className="blockquote-footer">
						<cite title="Source Title">Rita Mae Brown</cite>
					</figcaption>
					</figure>

			</div>
			<div className="row justify-content-center">
				<div className="col-sm-10 col-md-8 col-lg-5">
					<ul className="list-group">
					<li className="list-group-item d-flex justify-content-between align-items-center shadow-lg mx-4">
							<input
								type="text"
								onChange={(e) => setInputValue(e.target.value)}
								value={inputValue}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										if (inputValue.trim() !== "") {
										addToDo();
										}	
									}
								  }}
								placeholder="Escribe una nueva tarea"></input>
							<span className="badge bg-success">Press Intro</span>
						</li>

						{tarea.map((tarea, index) => (
						<li className="list-group-item d-flex justify-content-between align-items-center shadow-lg mx-4" key={index}>
    						{tarea.label}
							<button className="btn btn-outline-danger btn-sm" type="button"><i className="fas fa-trash"></i></button> 
						</li>
						))}
					</ul>
					<h1 className="fs-6 m-4 fw-light">Tareas pendientes: {tarea.length} </h1>
					<button className="btn btn-outline-danger btn-sm mx-3" type="button">Eliminar todas las tareas</button>
				</div>
			</div>

			<div className="row my-5">
				<div className="fixed-bottom p-4 text-danger text-center">
        			Made with ❤️ by <b>Julia</b>
      			</div>
			</div>
		</>
	);
};

export default Home;
