document.querySelector('#zipcodeForm').addEventListener
    ('submit', getZipcodeInfo);

function getZipcodeInfo(e) {

    // getZipValue from input
    const zipInfo = document.querySelector('.zip').value;

    // Making request
    fetch(`http://postalpincode.in/api/pincode/${zipInfo}`)
        .then(response =>
            {
                if(response.status !== 200) {
                    document.querySelector('#output')
                    .innerHTML = 
                    `<article class="message is-danger">
                        <div class="message-body">
                            Invalid Zipcode. Please try Again
                        </div>
                    </article>
                    `;
                    console.log('If Response',response);
                    throw Error(response.statusText);
                } else {
                    console.log('Else Response',response);
                    return response.json();
                }
            })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err)
        });

    e.preventDefault();
}