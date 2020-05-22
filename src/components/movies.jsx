import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import paginate from "../utils/paginate";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';
import { Row, Col } from 'react-bootstrap';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {
            path: "title",
            order: "asc"
        },
        pageSize: 4
    };

    componentDidMount = async () => {
        const { data } = await getGenres();
        const genres = [{ _id: "", name: "All Genres" }, ...data];
        const { data: movies } = await getMovies();
        this.setState({ movies, genres });
    }

    handleDelete = async movie => {

        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("This movie has already been deleted.");
            }
            this.setState({ movies: originalMovies });
        }
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        const currentPage = page;
        this.setState({ currentPage });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            currentPage,
            pageSize,
            movies: allMovies,
            searchQuery,
            selectedGenre,
            sortColumn
        } = this.state;

        let filtered = allMovies;

        if (searchQuery) {
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }
        else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    }

    render() {
        const {
            currentPage,
            pageSize,
            sortColumn,
            searchQuery
        } = this.state;

        const { totalCount, data: movies } = this.getPagedData();
        const { user } = this.props;

        return (
            <Row>
                <Col md={3}>
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                        className="mb-2"
                    />
                </Col>
                <Col md={9}>
                    {user && <Link to="/movies/new" className="btn btn-primary mb-2">New Movie</Link>}
                    <p>Showing {totalCount} movies in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                        user={user}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </Col>
            </Row>
        );
    }
}

export default Movies;
