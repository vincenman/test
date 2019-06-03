var excel = require('exceljs');
var workbook = new excel.Workbook(); //creating workbook
var sheet = workbook.addWorksheet('MySheet'); //creating worksheet

const path = require('path');
const fs = require('fs'); 
const directoryPath = path.join('new'); 

let objArray = [];

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    files.forEach(function (file) {
		let rawdata = fs.readFileSync('./' + directoryPath + '/'+file);  
		let jdata = JSON.parse(rawdata);
		let error = JSON.stringify(jdata.filtered_check_result[0]);
		
		
		if(error == undefined || JSON.parse(error).error_msg_en != 'Photo Not Recognized'){
			let cr = jdata.check_results;
			let array = {
				"": directoryPath,
				"name":file.replace('.jpg.original.jpg.json', ''),
				"sort": file.replace('blob-', '').replace('.jpg.original.jpg.json', ''),
				"fullfrontal_vertical_pos": cr.fullfrontal_vertical_pos.score,
				"fullfrontal_horizontal_pos": cr.fullfrontal_horizontal_pos.score,
				"fullfrontal_face_length_ratio": cr.fullfrontal_face_length_ratio.score,
				"fullfrontal_face_width_ratio": cr.fullfrontal_face_width_ratio.score,
				"fullfrontal_tilted_face": cr.fullfrontal_tilted_face.score,
				"fullfrontal_min_resolution": cr.fullfrontal_min_resolution.score,
				"fullfrontal_image_ratio": cr.fullfrontal_image_ratio.score,
				"non_frontal": cr.non_frontal.score,
				"blurred": cr.blurred.score,
				"bad_lighting": cr.bad_lighting.score,
				"hot_spots": cr.hot_spots.score,
				"unnatural_color": cr.unnatural_color.score,
				"low_dynamic": cr.low_dynamic.score,
				"red_eyes": cr.red_eyes.score,
				"eye_closed": cr.eye_closed.score,
				"bad_exposure": cr.bad_exposure.score,
				"eyes_looking_away": cr.eyes_looking_away.score,
				"non_uniform_background": cr.non_uniform_background.score,
				"mouth_open": cr.mouth_open.score,
				"glasses_frames_on_eyes": cr.glasses_frames_on_eyes.score,
				"glasses_reflections": cr.glasses_reflections.score,
				"hair_on_eyes": cr.hair_on_eyes.score,
				"white_color_score": cr.white_color_score.score,
				"custom_fullfrontal_vertical_pos": cr.custom_fullfrontal_vertical_pos.score,
				"custom_fullfrontal_horizontal_pos": cr.custom_fullfrontal_horizontal_pos.score,
				"custom_fullfrontal_face_length_ratio": cr.custom_fullfrontal_face_length_ratio.score,
				"custom_fullfrontal_face_width_ratio": cr.custom_fullfrontal_face_width_ratio.score,
				"custom_fullfrontal_face_too_big": cr.custom_fullfrontal_face_too_big.score,
				"custom_fullfrontal_face_too_small": cr.custom_fullfrontal_face_too_small.score
			};
			//console.log(file + " : " + cr.fullfrontal_vertical_pos.score);
			objArray.push(array);
			//console.log(objArray.length);
		} else {
			var array = {
				"": directoryPath,
				"name":file.replace('.jpg.original.jpg.json', ''),
				"sort": file.replace('blob-', '').replace('.jpg.original.jpg.json', ''),
				"fullfrontal_vertical_pos": 'Photo Not Recognized',
				"fullfrontal_horizontal_pos": '',
				"fullfrontal_face_length_ratio": '',
				"fullfrontal_face_width_ratio": '',
				"fullfrontal_tilted_face": '',
				"fullfrontal_min_resolution": '',
				"fullfrontal_image_ratio": '',
				"non_frontal": '',
				"blurred": '',
				"bad_lighting": '',
				"hot_spots": '',
				"unnatural_color": '',
				"low_dynamic": '',
				"red_eyes": '',
				"eye_closed": '',
				"bad_exposure": '',
				"eyes_looking_away": '',
				"non_uniform_background": '',
				"mouth_open": '',
				"glasses_frames_on_eyes": '',
				"glasses_reflections": '',
				"hair_on_eyes": '',
				"white_color_score": '',
				"custom_fullfrontal_vertical_pos": '',
				"custom_fullfrontal_horizontal_pos": '',
				"custom_fullfrontal_face_length_ratio": '',
				"custom_fullfrontal_face_width_ratio": '',
				"custom_fullfrontal_face_too_big": '',
				"custom_fullfrontal_face_too_small": ''
			};
			objArray.push(array);
			//console.log(file + " : " + JSON.parse(error).error_msg_en);
		}
		 
    });
	
	
	sheet.addRow().values = Object.keys(objArray[0]);

	objArray.forEach(function(item){
		var valueArray = [];
		valueArray = Object.values(item); // forming an array of values of single json in an array
		
		//console.log(valueArray);
		sheet.addRow().values = valueArray; // add the array as a row in sheet
	})

	workbook.xlsx.writeFile('./' + directoryPath +'/output.xlsx').then(function() {
		console.log("file is written");
	});
});
