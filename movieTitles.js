const https = require('https');
/*
 * Complete the function below.
 * Use console.log to print the result, you should not return from the function.
 * Base url: https://jsonmock.hackerrank.com/api/movies/search/?Title=
 */

const baseUrl = 'https://jsonmock.hackerrank.com/api/movies/search/';

function getMoviesFromPage(substr, pageNumber) {
    let url = `${baseUrl}?Title=${substr}&page=${pageNumber}`;
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            const chunks = [];
            response.on('data', chunk => {
                chunks.push(Buffer.from(chunk));
            });

            response.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const parsedData = JSON.parse(buffer.toString());
                resolve(parsedData.data);
            })
        });
    });
}

function getInitialData(s) {
    let url = `${baseUrl}?Title=${s}`;

    return new Promise((resolve, reject) => {
        https.get(url, response => {
            const chunks = [];
            response.on('data', chunk => {
                chunks.push(Buffer.from(chunk));
            });

            response.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const parsedData = JSON.parse(buffer.toString());
                resolve({
                    totalPages: parsedData.total_pages,
                    movies: parsedData.data
                });
            });
        });
    })
}

function getTitles(movies) {
    const titles = [];
    for (let movie of movies) {
        titles.push(movie.Title);
    }
    return titles;
}

function printResult(titles) {
    for (let title of titles) {
        console.log(title);
    }
}

function getMovieTitles(substr) {
    // first step: call the API with just title and save the 10 or less results
    getInitialData(substr).then(initialData => {
        const totalPages = initialData.totalPages;
        let movies = initialData.movies;
        let moviesPromises = [];
        // if only one page is available we don't do anything.
        if (totalPages === 1) {
            let resultMoviesTitles = getTitles(movies);
            // sort the array
            resultMoviesTitles.sort();
            // return the array
            printResult(resultMoviesTitles);
        } else {
            // loop through the number of needed calls (pages) and add the results to the result array
            for (let currentPage = 2; currentPage <= totalPages; currentPage++) { // page 1 has been retrieved with initial data.
                moviesPromises.push(getMoviesFromPage(substr, currentPage));
            }
            Promise.all(moviesPromises).then(res => {
                for (let fetchedMovies of res) {
                    movies = movies.concat(fetchedMovies);
                }
                let resultMoviesTitles = getTitles(movies);
                // sort the array
                resultMoviesTitles.sort();
                // return the array
                printResult(resultMoviesTitles);
            }).catch(error => console.log(error));
        }
    });
}