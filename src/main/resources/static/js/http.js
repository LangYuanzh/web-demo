var httpPost = function(url,data) {
    $.ajax({
        type:"post",
        url: url,
        data: data,
        dataType:"json",
        error: function(){
            alert('Error loading XML document');
        },
        success:function(msg){
            console.info(msg);
            return msg;
        }
    });
}

var axiosPost = function  () {
    return axios.post('/lastdata', {
        endtime: 'begin',
        starttime: 'begin'
    })
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });

}
