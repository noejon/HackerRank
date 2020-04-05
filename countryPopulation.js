/*
 * Complete the function below.
 * Instead of returning the answer, log the answer to the console.
 * https://jsonmock.hackerrank.com/api/countries/search?name=  
 */

const baseUrl = 'https://jsonmock.hackerrank.com/api/countries/search';

function getCountriesFromPage(s, pageNumber) {
    let url = `${baseUrl}?name=${s}&page=${pageNumber}`;
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
    let url = `${baseUrl}?name=${s}`;

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
                    countries: parsedData.data
                });
            });
        });
    })
}

function hasPopulation(country, p) {
    return country.population > p;
}

function getPopulatedCountriesCount(countries, p) {
    let count = 0;
    for (let country of countries) {
        if (country.population > p) {
            count += 1;
        }
    }
    return count;
}

function getCountries(s, p) {
    // We do a first call in which we get the first page information and then we check the total number of pages
    getInitialData(s).then(initialData => {
        const totalPages = initialData.totalPages;
        let countries = initialData.countries;
        let countriesPromises = [];
        if (totalPages === 1) {
            console.log(getPopulatedCountriesCount(countries, p));
        } else {
            for (let currentPage = 2; currentPage <= totalPages; currentPage++) { // page 1 has been retrieved with initial data.
                countriesPromises.push(getCountriesFromPage(s, currentPage));
            }
            Promise.all(countriesPromises).then(res => {
                for (let fetchedCountries of res) {
                    countries = countries.concat(fetchedCountries);
                }
                console.log(getPopulatedCountriesCount(countries, p));
            }).catch(error => console.log(error))
        }
    });
}