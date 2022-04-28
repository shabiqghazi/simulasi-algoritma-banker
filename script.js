let jml_proses = parseInt(window.prompt("Masukkan jumlah proses : "));
let jml_resource = parseInt(window.prompt("Masukkan jumlah resource : "));
let jml_anggota_resource = window.prompt("Masukkan jumlah anggota resource(pakai spasi)").split(" ");

let allocation = [];
let max = [];

for(let i = 0; i < jml_proses; i++){
  allocation[i] = window.prompt("Masukkan jumlah allocation untuk P" + (i) + "(pakai spasi)").split(" ");
}
for(let i = 0; i < jml_proses; i++){
  max[i] = window.prompt("Masukkan jumlah max untuk P" + (i) + "(pakai spasi)").split(" ");
}
for(let i = 0; i < jml_proses; i++){
  for(let j = 0; j < jml_resource; j++){
    allocation[i][j] = parseInt(allocation[i][j])
    max[i][j] = parseInt(max[i][j])
  }
}

let need = [];
for(let i = 0; i < jml_proses; i++){
  need[i] = [];
}

console.table(allocation)
console.table(max)
for(let i = 0; i < jml_proses; i++){
  for(let j = 0; j < jml_resource; j++){
    need[i][j] = parseInt(max[i][j]) - parseInt(allocation[i][j]);
  }
}

console.table(need)

let available = [...jml_anggota_resource];
for(let i = 0; i < jml_proses; i++){
  for(let j = 0; j < jml_resource; j++){
    available[j] -= parseInt(allocation[i][j]);
  }
}

let processed = [];
let inc = 0;
let loop = true;
let last;
let availableTable = [];
availableTable[0] = [...available];
counterAvailTable = 1;
counterProcessed = 0;

let stringPerhitungan = ``;
while(loop){
  if(inc == 0){
    last = processed[processed.length - 1];
  }
  if(!processed.includes(inc)){
    stringPerhitungan += `<br>P${inc} -> ${need[inc].join(' ')} <= ${available.join(' ')}<br>`;
    if(parseInt(need[inc].join('')) <= parseInt(available.join(''))){
      stringPerhitungan += `  True, Eksekusi P${inc}<br>`;
      stringPerhitungan += `  New available <br>  = ${available.join(' ')} + ${allocation[inc].join(' ')}<br>`;
      for(let j = 0; j < jml_resource; j++){
        available[j] += parseInt(allocation[inc][j]);
      }
      stringPerhitungan += `  = ${available.join(' ')}<br>`;
      
      processed[counterProcessed++] = inc;
      availableTable[counterAvailTable++] = [...available];
    } else {
      stringPerhitungan += `  False<br>`;
    }
  }
  inc++;
  if(inc >= jml_proses){
    inc = 0;
    if(processed[processed.length - 1] == last){
      loop = false;
    }
  }
}
console.table(availableTable);

let string = ``;
let stateStatus = ``;
if(jml_proses == processed.length){
  stateStatus = `Safe`
  for(let i = 0; i < jml_proses; i++){
    string += `<tr>
      <td>P${(i)}</td>
      <td>${ allocation[i].join(" ")}</td>
      <td>${ max[i].join(" ")}</td>
      <td>${ availableTable[i].join(" ")}</td>
      <td>${ need[i].join(" ")}</td>
    </tr>`
  }
  
} else {
  stateStatus = `Unsafe`;
  for(let i = 0; i < jml_proses; i++){
    string += `<tr>
      <td>${(i+1)}</td>
      <td>${ allocation[i].join(" ")}</td>
      <td>${ max[i].join(" ")}</td>
      <td>${ availableTable[i] ? availableTable[i].join(" ") : ''}</td>
      <td>${ need[i].join(" ")}</td>
    </tr>`
  }
}
console.log(processed);

let char = [];
for(let i = 0; i < jml_resource; i++){
  char[i] = String.fromCharCode(65 + i);
}
document.getElementById("matrix").innerHTML = `
  <h3>Proses Perhitungan : </h3>
  ${stringPerhitungan}
  <h3>Urutan eksekusi : </h3>
  <p>${processed.map(p => (`P${p}`)).join(" -> ")}</p>
  <h3>Status : </h3>
  <p>${stateStatus}</p>
  <table border="1" cellspacing="0" cellpadding="5" style="text-align:center">
  <thead>
    <tr>
      <th rowspan="2">Process</th>
      <th>Allocation</th>
      <th>Max</th>
      <th>Available</th>
      <th>Need</th>
    </tr>
    <tr>
      <th>${char.join(" ")}</th>
      <th>${char.join(" ")}</th>
      <th>${char.join(" ")}</th>
      <th>${char.join(" ")}</th>
    </tr>
  </thead>
  <tbody>
    ${string}
    <td></td>
    <td></td>
    <td></td>
    <td>${(availableTable[availableTable.length - 1]).join(" ")}</td>
    <td></td>
  </tbody>
  </table>`;