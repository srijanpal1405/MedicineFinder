// fetch("input.json")
//         .then(response => response.json())
//         .then(data => {
//             console.log(5000)
//             document.querySelector("result").innerText = data[0].shop_name
//         })


        let fetchRes = fetch(
            "input.json");
                    // fetchRes is the promise to resolve
                    // it by using.then() method
                    fetchRes.then(res =>
                        res.json()).then(d => {
                            console.log(1000)
                        })