document.getElementById('inputFormDetail').value = "Cần tư vấn về Gói giải pháp cho doanh nghiệp sản xuất";
function validateName() {
    var name = document.getElementById('inputFormName').value;
    if(name.length == 0) {
      showValidate('Họ và tên bắt buộc nhập', 'name-error' , 'red')
      return false;
    }
    showValidate('','name-error', 'red');
    return true;
}

function validateDetail() {
    var name = document.getElementById('inputFormDetail').value;
    if(name.length == 0) {
      showValidate('Nội dung bắt buộc nhập', 'name-error' , 'red')
      return false;
    }
    showValidate('','name-error', 'red');
    return true;
}

function validateEmail() {
    var email = document.getElementById('inputFormEmail').value;
    if(email.length == 0) {
      showValidate('Email bắt buộc nhập','email-error', 'red');
      return false;
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    showValidate('Email không đúng định dạng! Vui lòng kiểm tra lại.', 'email-error', 'red');
    return false;
    }
    showValidate('','email-error', 'red');
    return true;
}

function showValidate(message, promptLocation, color) {
    document.getElementById(promptLocation).innerHTML = message;
    document.getElementById(promptLocation).style.color = color;  
}  

function resetDataForm() {
    document.getElementById('inputFormEmail').value = '';
    document.getElementById('inputFormName').value = '';
    document.getElementById('inputFormDetail').value = '';
    document.getElementById('btnSendForm').disabled = false;
    document.getElementById('btnSendForm').innerText = 'Gởi';
}

function toastMessage(message,status){
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    if(message!= '' && status){
        (status == 200) ? toastLiveExample.classList.remove('text-bg-danger') : toastLiveExample.classList.remove('text-bg-success');
        toastLiveExample.classList.add((status == 200) ? 'text-bg-success': 'text-bg-danger');
        document.getElementById('message-value').innerText = message;
        toastBootstrap.show();
    }
}

function handleValidateForm(){
    document.getElementById('btnSendForm').disabled = (!validateName() || !validateEmail() || !validateDetail()) ? true: false;
}
  
function handleSubmitForm(){
    let email, name, detail;
    email = document.getElementById('inputFormEmail').value;
    name = document.getElementById('inputFormName').value;
    detail = document.getElementById('inputFormDetail').value;
    if (!validateName() || !validateEmail() || !validateDetail()) {
        toastMessage('Vui lòng cung cấp đầy đủ các thông tin bắt buộc!.',500);
        return false;
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "OCSESSID=df2a6a237f2b95b0dcc3717158; currency=VND; language=vi-vn");

        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("telephone", "0776207364");
        formdata.append("enquiry", detail);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
        document.getElementById('btnSendForm').disabled = true;
        document.getElementById('btnSendForm').innerText = 'Đang gởi yêu cầu! Vui lòng chờ trong vài giây...';
        fetch("https://shopnow.com.vn/lien-he.html", requestOptions)
        .then(response => {
            if(response.status == 200){
                toastMessage('Gởi yêu cầu thành công!',200);
                resetDataForm();
            }else{
                toastMessage('Gởi yêu cầu không thành công! Vui lòng thử lại.',500);
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));      
    }
}