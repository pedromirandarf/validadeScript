document.addEventListener('change', async() => {
    const emailHolder = await document.getElementsByName('email')[0]['value'];
    let dominioC = String(emailHolder);
    if(dominioC.includes("@")){
        let ar = dominioC.split("@");
        dominioC = (ar[0] === '@')  ? ar[1] : ar[0];
        dominioC = (ar[1] === 'com')  ? ar[0] : ar[1];
        ar = dominioC.split(".");
        dominioC = (ar[0] === 'www')  ? ar[1] : ar[0];
        dominioC = (ar[1] === 'com')  ? ar[0] : ar[1];
    }
    if(dominioC == "gmail" || dominioC == "hotmail" || dominioC == "outlook" || dominioC == "live" || dominioC == "yahoo"){
        document.getElementsByName('email')[0]['value'] = "";
        window.alert("Utilize um email institucional");
    }else{
        await axios.get(`https://compugrafapi.herokuapp.com/account/bd/?id=${dominioC}`).then(response => {
            if(document.getElementsByName('customer_account').length != 0){
                document.getElementsByName('customer_account')[0]['value'] = response.data.Data[0].Empresa;;    
            }else if(document.getElementsByName('field[50]').length != 0){
                document.getElementsByName('field[50]')[0]['value'] =response.data.Data[0].Empresa;;

            }else if(document.getElementsByName('company').length != 0){
                document.getElementsByName('company')[0]['value'] =response.data.Data[0].Empresa;;
            }
        })
        .catch(error => {
            dominioC = dominioC.substring(0,1).toUpperCase().concat(dominioC.substring(1));
            if(document.getElementsByName('customer_account').length !== 0){
                document.getElementsByName('customer_account')[0]['value'] = dominioC;    
            }else if(document.getElementsByName('field[50]').length !== 0){
                document.getElementsByName('field[50]')[0]['value'] =dominioC;

            }else if(document.getElementsByName('company')[0]['value'].length !== 0){
                document.getElementsByName('company')[0]['value'] =dominioC;
            }
        });
    }


});
