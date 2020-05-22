import React from 'react';
import Jio from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

class MovieForm extends Form {
    state = {
        data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
        genres: [],
        errors: {}
    }

    schema = {
        _id: Jio.string(),
        title: Jio.string().required().label("Title"),
        genreId: Jio.string().required().label("Genre"),
        numberInStock: Jio.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Jio.number().required().min(0).max(10).label("Daily Rental Rate")
    }

    async populateGenres()
    {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovies()
    {
        const movieId = this.props.match.params.id;

        if (movieId === "new") return;

        try {
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovies();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    async doSubmit() {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                {this.renderInput("title", "Title")}
                {this.renderSelect("genreId", "Genre", this.state.genres)}
                {this.renderInput("numberInStock", "Number in Stock", "number")}
                {this.renderInput("dailyRentalRate", "Rate", "number")}
                {this.renderSubmit("Save")}
            </div>
        );
    }
}

export default MovieForm;