/* eslint-disable */

const ajax = (data) => {
  let formData = new FormData();

  formData.append('avatar_data', '{"x": 0, "y": 0, "width": 1000, "height": 1000}');
  formData.append('avatar_file', data);

  console.log(data);

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://test.weiqiangtech.com/uuuuu/cutUpload');
    xhr.setRequestHeader('enctype', 'multipart/form-data');


    xhr.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        console.log(request);
      }
    };

    xhr.send(formData);
  })



};

export default ajax;