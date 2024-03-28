document.addEventListener("DOMContentLoaded",()=>{
   const tb = document.getElementById('cryptoTable');
   const searchInput = document.getElementById('searchInput');
   
   const sortMarketCapButton = document.getElementById('sortMarketCapButton');
   const sortPercentageChangeButton = document.getElementById('sortPercentageChangeButton');

   let cryptoData=[];
   
   const fetchFunc = ()=>{
    //    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    fetch('d.json')   
    .then(response=>response.json())
       .then(data=>{cryptoData=data
         renderCryptoTable();
        }).catch(
            error => console.error('Error fetching data:', error)
        )
   }

   fetchFunc();
    renderCryptoTable=()=>{
        tb.innerHTML = '';
        cryptoData.forEach(crypto=>{
            const row = document.createElement('tr');
            row.innerHTML=`
             <td><img src="${crypto.image}"></td>
             <td>${crypto.name}</td>
             <td>${crypto.symbol.toUpperCase()}</td>
             <td>$${crypto.current_price}</td>
             <td>$${crypto.total_volume.toLocaleString()}</td>
             <td style="color: red;">${crypto.price_change_percentage_24h.toFixed(2)}%</td>
             <td>Mkt Cap : $${crypto.market_cap.toLocaleString()}</td>
            `;
            console.log(row)
            tb.appendChild(row);
        })
    }

     // Sort by market cap
     sortMarketCapButton.addEventListener('click', () => {
        cryptoData.sort((a, b) => b.market_cap - a.market_cap);
        renderCryptoTable();
      });
    
      // Sort by percentage change
      sortPercentageChangeButton.addEventListener('click', () => {
        cryptoData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderCryptoTable();
      });

      function search() {
        const searchText = searchInput.value.trim().toUpperCase();
        console.log(searchText)

        if (searchText === '') {
            renderCryptoTable(cryptoData); // If search input is empty, render original data
            console.log("empty run")
            return;
        }

        const filteredData = cryptoData.filter(item => {
            // console.log("running")
            // console.log("Item:", item.name, item.symbol);
            // const tp = item.name.toUpperCase().includes(searchText) || item.symbol.toUpperCase().includes(searchText);
            // console.log(tp)
            // return tp;

            const nameMatch = item.name.toUpperCase().includes(searchText);
        const symbolMatch = item.symbol.toUpperCase().includes(searchText);
        
        console.log("Item:", item.name, item.symbol);
        console.log("Name Match:", nameMatch);
        console.log("Symbol Match:", symbolMatch);

        return nameMatch || symbolMatch;
        });
         
        console.log(filteredData)
        tb.innerHTML = '';
        console.log(tb)
        updateCryptoTable(filteredData);
    }

  
    searchInput.addEventListener('change', search);


    const updateCryptoTable = (data) => {
        tb.innerHTML = '';
        data.forEach(crypto => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td><img src="${crypto.image}"></td>
             <td>${crypto.name}</td>
             <td>${crypto.symbol.toUpperCase()}</td>
             <td>$${crypto.current_price}</td>
             <td>$${crypto.total_volume.toLocaleString()}</td>
             <td style="color: red;">${crypto.price_change_percentage_24h.toFixed(2)}%</td>
             <td>Mkt Cap : $${crypto.market_cap.toLocaleString()}</td>
          `;
          tb.appendChild(row);
        });
      };

})