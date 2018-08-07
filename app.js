document.querySelector('#zipcodeForm').addEventListener
    ('submit', getZipcodeInfo);

// Listen for Delete
document.querySelector('body').addEventListener
    ('click', deleteInfo);


function getZipcodeInfo(e) {

    // getZipValue from input
    const zipInfo = document.querySelector('.zip').value;

    // Making request
    fetch(`http://postalpincode.in/api/pincode/${zipInfo}`)
        .then(response =>
            {
                // if(response.status !== 200) {
                //     toggleIcon('remove');
                //     document.querySelector('#output')
                //     .innerHTML = 
                //     `<article class="message is-danger">
                //         <div class="message-body">
                //             Invalid Zipcode. Please try Again
                //         </div>
                //     </article>
                //     `;
                //     console.log('If Response',response);
                //     throw Error(response.statusText);
                // } else {
                    toggleIcon('active');
                    return response.json();
                // }
            })
        .then(data => {
            console.log(data);
            let output = '';

            data.PostOffice.forEach((elem) => {
                output += `
                    <article class="message is-primary">
                        <div class="message-header">
                            <p>Post Office Information</p>
                            <button class="delete"></button>
                        </div>
                        <div class="message-body">
                            <ul>
                                <li>
                                    <strong>Name: </strong>${elem['Name']}
                                </li>
                                <li>
                                    <strong>Branch Type: </strong>${elem['BranchType']}
                                </li>
                                <li>
                                    <strong>Delivery Status: </strong>${elem['DeliveryStatus']}
                                </li>
                                <li>
                                    <strong>District: </strong>${elem['District']}
                                </li>
                                <li>
                                    <strong>State: </strong>${elem['State']}
                                </li>
                            </ul>
                        </div>
                    </article>
                `;
            });
            document.querySelector('#output').innerHTML = output;
        })
        .catch(err => {
            console.log(err)
        });

    e.preventDefault();
}

function toggleIcon(icon) {
    document.querySelector('.remove-icon').style.display = 'none';
    document.querySelector('.active-icon').style.display = 'none';

    document.querySelector(`.${icon}-icon`).style.display = 'inline-flex';
}

function deleteInfo(e) {
    console.log(e);
    if(e.target.className == 'delete') {
        document.querySelector('.message').remove();
    }
    
}