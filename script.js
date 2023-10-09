let cryptoAmount = 0.0000;
let moneyAmount = 0.00;
let rigPrice = 12;
let cryptoIncrementPerClick = 0.0001;
let RTX4090Price = 500;
let RTX4090Quantity = 0;
let ThreadripperPrice = 5100;
let ThreadripperQuantity = 0;
let WorkerPrice = 1000;
let WorkerQuantity = 0;
let cryptoPerSecond = 0.0000;
let FasterMinerPrice = 10;
let AltComputerPrice = 100;



let isSellingCrypto = false;
let workerTimer = null;
let altComputerTimer = null;

document.addEventListener("DOMContentLoaded", function () {
  showUpgradesPage(); // Remove this line to prevent automatic opening of upgrades
  closeShopPage();

  const clickAnywhereText = document.createElement("p");
  clickAnywhereText.textContent = "Click Anywhere";
  clickAnywhereText.classList.add("pulsing-text");
  document.body.appendChild(clickAnywhereText);

  function handleFirstClick(event) {
    document.removeEventListener("click", handleFirstClick);
    clickAnywhereText.remove();
  }
  
  document.addEventListener("click", handleFirstClick);
});



function updateRigPriceDisplay() {
  const rigPriceElement = document.getElementById("rigPrice");
  rigPriceElement.textContent = `$${rigPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function updateRTX4090PriceDisplay() {
  const RTX4090PriceElement = document.getElementById("4090Price");
  RTX4090PriceElement.textContent = `$${RTX4090Price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function updateThreadripperPriceDisplay() {
  const ThreadripperPriceElement = document.getElementById("ThreadripperPrice");
  ThreadripperPriceElement.textContent = `$${ThreadripperPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function updateWorkerPriceDisplay() {
  const WorkerPriceElement = document.getElementById("WorkerPrice");
  WorkerPriceElement.textContent = `$${WorkerPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function startWorkerTimer() {
  if (!workerTimer) {
    workerTimer = setInterval(incrementCryptoPerSecond, 1000);
  }
}

function startAltComputerTimer() {
  if (!altComputerTimer) {
    altComputerTimer = setInterval(incrementAltComputerIncome, 1000);
  }
}

function buyRig() {
  if (moneyAmount >= rigPrice) {
    moneyAmount -= rigPrice;
    updateMoney();
    rigPrice *= 1.75;
    cryptoIncrementPerClick += 0.0004;
    updateRigPriceDisplay();
  }
}

function buyRTX4090() {
  if (moneyAmount >= RTX4090Price) {
    moneyAmount -= RTX4090Price;
    RTX4090Quantity++;
    updateMoney();
    RTX4090Price *= 2.09;
    cryptoIncrementPerClick += 0.002;
    updateRTX4090PriceDisplay();
  }
}

function buyThreadripper() {
  if (moneyAmount >= ThreadripperPrice) {
    moneyAmount -= ThreadripperPrice;
    ThreadripperQuantity++;
    updateMoney();
    ThreadripperPrice *= 1.75;
    cryptoIncrementPerClick += 0.006;
    updateThreadripperPriceDisplay();
  }
}

function buyWorker() {
  if (moneyAmount >= WorkerPrice) {
    moneyAmount -= WorkerPrice;
    WorkerQuantity++;
    updateMoney();
    WorkerPrice *= 1.35;
    cryptoPerSecond += 0.0013;
    updateWorkerPriceDisplay();
    startWorkerTimer();
  }
}

function updateMoney() {
  const moneyDisplay = document.getElementById("moneyDisplay");
  let moneyText;

  if (moneyAmount >= 1000000000) {
    const abbreviatedMoney = (moneyAmount / 1000000000).toFixed(1);
    moneyText = `$${abbreviatedMoney}B`;
  } else if (moneyAmount >= 1000000) {
    const abbreviatedMoney = (moneyAmount / 1000000).toFixed(1);
    moneyText = `$${abbreviatedMoney}M`;
  } else {
    moneyText = `$${moneyAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  }

  moneyDisplay.textContent = moneyText;
}

function incrementCryptoPerSecond() {
  cryptoAmount += cryptoPerSecond * WorkerQuantity;
  updateCrypto();
}

function incrementAltComputerIncome() {
  cryptoAmount += cryptoPerSecond;
  updateCrypto();
}

function sellCrypto() {
  if (!isSellingCrypto && cryptoAmount > 0) {
    isSellingCrypto = true;
    const cryptoToSell = cryptoAmount;
    const cryptoWorth = (cryptoToSell * 10000) * 0.02;
    moneyAmount += cryptoWorth;
    cryptoAmount = 0.0000;
    updateCrypto();
    updateMoney();
    isSellingCrypto = false;
  }
}

document.getElementById("sellButton").addEventListener("click", function (event) {
  event.stopPropagation();
  sellCrypto();
});

function updateCrypto() {
  const cryptoElement = document.getElementById("cryptoAmount");
  let cryptoText;

  if (cryptoAmount >= 1000000000000000) {
    const abbreviatedCrypto = (cryptoAmount / 1000000000000000).toFixed(1);
    cryptoText = `${abbreviatedCrypto}QC`;
  } else if (cryptoAmount >= 1000000000000) {
    const abbreviatedCrypto = (cryptoAmount / 1000000000000).toFixed(1);
    cryptoText = `${abbreviatedCrypto}TC`;
  } else if (cryptoAmount >= 1000000000) {
    const abbreviatedCrypto = (cryptoAmount / 1000000000).toFixed(1);
    cryptoText = `${abbreviatedCrypto}BC`;
  } else if (cryptoAmount >= 1000000) {
    const abbreviatedCrypto = (cryptoAmount / 1000000).toFixed(1);
    cryptoText = `${abbreviatedCrypto}MC`;
  } else if (cryptoAmount >= 1000) {
    const abbreviatedCrypto = (cryptoAmount / 1000).toFixed(1);
    cryptoText = `${abbreviatedCrypto}KC`;
  } else {
    cryptoText = cryptoAmount.toFixed(4);
  }

  cryptoElement.textContent = cryptoText;

  const cryptoWorth = (cryptoAmount * 10000) * 0.02;
  const cryptoWorthElement = document.getElementById("cryptoWorth");
  cryptoWorthElement.textContent = `($${cryptoWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })})`;
}

function increaseCrypto() {
  cryptoAmount += cryptoIncrementPerClick;
  updateCrypto();
}

document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("unselectable")) {
    increaseCrypto();
  }
});

function showShopPage() {
  const shopPage = document.getElementById("shopPage");
  shopPage.style.display = "flex";
  updateRigPriceDisplay();
  updateRTX4090PriceDisplay();
  updateThreadripperPriceDisplay();
}

function closeShopPage() {
  const shopPage = document.getElementById("shopPage");
  shopPage.style.display = "none";
}

function createClickParticles(x, y) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000);
}

document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("unselectable")) {
    increaseCrypto();
    createClickParticles(event.clientX, event.clientY);
  }
});

document.getElementById("shopButton").addEventListener("click", showShopPage);
document.getElementById("closeShopButton").addEventListener("click", closeShopPage);

document.addEventListener("DOMContentLoaded", function () {
  closeShopPage();

  const clickAnywhereText = document.createElement("p");
  clickAnywhereText.textContent = "Click Anywhere";
  clickAnywhereText.classList.add("pulsing-text");
  document.body.appendChild(clickAnywhereText);

  function handleFirstClick(event) {
    document.removeEventListener("click", handleFirstClick);
    clickAnywhereText.remove();
  }
  
  document.addEventListener("click", handleFirstClick);
});

function showUpgradesPage() {
  const upgradesPage = document.getElementById("upgradesPage");
  upgradesPage.style.display = "flex"; // Show the upgrades section
  updateFasterMinerPriceDisplay();
  updateAltComputerPriceDisplay();
}

function closeUpgradesPage() {
  const upgradesPage = document.getElementById("upgradesPage");
  upgradesPage.style.display = "none";
}

document.getElementById("upgradesButton").addEventListener("click", showUpgradesPage);
document.getElementById("closeUpgradesButton").addEventListener("click", closeUpgradesPage);


function updateFasterMinerPriceDisplay() {
  const FasterMinerPriceElement = document.getElementById("Fasterminer");
  FasterMinerPriceElement.textContent = `$${FasterMinerPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function updateAltComputerPriceDisplay() {
  const AltComputerPriceElement = document.getElementById("altcomputer");
  AltComputerPriceElement.textContent = `$${AltComputerPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function buyFasterMinerUpgrade() {
  if (moneyAmount >= FasterMinerPrice) {
    moneyAmount -= FasterMinerPrice;
    updateMoney();
    cryptoIncrementPerClick += 0.0001; // Increase click value by 0.0001 (customize as needed)
    FasterMinerPrice *= 1.2; // Increase upgrade price (customize as needed)
    updateFasterMinerPriceDisplay();
  }
}

function buyAltComputer() {
  if (moneyAmount >= AltComputerPrice) {
    moneyAmount -= AltComputerPrice;
    updateMoney();
    AltComputerPrice *= 1.6; // Increase upgrade price (customize as needed)
    cryptoPerSecond += 0.0001; // Increase passive income rate (customize as needed)
    updateAltComputerPriceDisplay();
    startAltComputerTimer(); // Start the timer when Alt Computer is purchased
  }
}

document.getElementById("Fasterminer").addEventListener("click", buyFasterMinerUpgrade);
document.getElementById("altcomputer").addEventListener("click", buyAltComputer);


function formatNumberWithAbbreviation(number) {
  if (number >= 1e12) {
    return (number / 1e12).toFixed(1) + 'T'; // Convert to trillion
  } else if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + 'B'; // Convert to billion
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + 'M'; // Convert to million
  } else {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }
}

function updateRigPriceDisplay() {
  const rigPriceElement = document.getElementById("rigPrice");
  rigPriceElement.textContent = `$${formatNumberWithAbbreviation(rigPrice)}`;
}

function updateRTX4090PriceDisplay() {
  const RTX4090PriceElement = document.getElementById("4090Price");
  RTX4090PriceElement.textContent = `$${formatNumberWithAbbreviation(RTX4090Price)}`;
}

function updateThreadripperPriceDisplay() {
  const ThreadripperPriceElement = document.getElementById("ThreadripperPrice");
  ThreadripperPriceElement.textContent = `$${formatNumberWithAbbreviation(ThreadripperPrice)}`;
}

function updateWorkerPriceDisplay() {
  const WorkerPriceElement = document.getElementById("WorkerPrice");
  WorkerPriceElement.textContent = `$${formatNumberWithAbbreviation(WorkerPrice)}`;
}

function updateFasterMinerPriceDisplay() {
  const FasterMinerPriceElement = document.getElementById("Fasterminer");
  FasterMinerPriceElement.textContent = `$${formatNumberWithAbbreviation(FasterMinerPrice)}`;
}

function updateAltComputerPriceDisplay() {
  const AltComputerPriceElement = document.getElementById("altcomputer");
  AltComputerPriceElement.textContent = `$${formatNumberWithAbbreviation(AltComputerPrice)}`;
}

// Function to save the game state
function saveGame() {
  const gameData = {
    cryptoAmount,
    moneyAmount,
    rigPrice,
    cryptoIncrementPerClick,
    RTX4090Price,
    RTX4090Quantity,
    ThreadripperPrice,
    ThreadripperQuantity,
    WorkerPrice,
    WorkerQuantity, 
    cryptoPerSecond,
    FasterMinerPrice,
    AltComputerPrice

    // Add other game state variables here
  };
  localStorage.setItem('cryptoClickerSave', JSON.stringify(gameData));
}

// Function to load the game state
function loadGame() {
  const savedData = localStorage.getItem('cryptoClickerSave');
  if (savedData) {
    const gameData = JSON.parse(savedData);

    cryptoAmount = gameData.cryptoAmount;
    moneyAmount = gameData.moneyAmount;
    rigPrice = gameData.rigPrice;
    cryptoIncrementPerClick = gameData.cryptoIncrementPerClick;
    RTX4090Price = gameData.RTX4090Price;
    RTX4090Quantity = gameData.RTX4090Quantity;
    ThreadripperPrice = gameData.ThreadripperPrice;
    ThreadripperQuantity = gameData.ThreadripperQuantity;
    WorkerPrice = gameData.WorkerPrice;
    WorkerQuantity = gameData.WorkerQuantity;
    cryptoPerSecond = gameData.cryptoPerSecond;
    FasterMinerPrice = gameData.FasterMinerPrice;
    AltComputerPrice = gameData.AltComputerPrice;
    // Load other game state variables here

    // Update the displayed values after loading
    updateCrypto();
    updateMoney();
    updateRigPriceDisplay();
    updateRTX4090PriceDisplay();
    updateThreadripperPriceDisplay();
    updateWorkerPriceDisplay();
    updateFasterMinerPriceDisplay();
    updateAltComputerPriceDisplay();
    // Update other elements as needed
  }
}

// Call the loadGame function when the game starts to load the saved state
document.addEventListener('DOMContentLoaded', function () {
  loadGame();
});

// Call the saveGame function whenever the game state changes (e.g., when the player buys something or earns crypto)
function updateGame() {
  saveGame();
}

// Example: Update game state when the player buys a rig
function buyRig() {
  if (moneyAmount >= rigPrice) {
    moneyAmount -= rigPrice;
    updateMoney();
    rigPrice *= 1.75;
    cryptoIncrementPerClick += 0.0004;
    updateRigPriceDisplay();
    
    // Call the updateGame function to save the game state
    updateGame();
  }
}

// Example: Update game state when the player earns crypto
function increaseCrypto() {
  cryptoAmount += cryptoIncrementPerClick;
  updateCrypto();

  // Call the updateGame function to save the game state
  updateGame();
}

// You can similarly update the other functions that change the game state


document.getElementById("resetButton").addEventListener("click", resetGame);

function resetGame() {
  // Reset all game variables to their initial values
  cryptoAmount = 0.0000;
  moneyAmount = 0.00;
  rigPrice = 12;
  cryptoIncrementPerClick = 0.0001;
  RTX4090Price = 500;
  RTX4090Quantity = 0;
  ThreadripperPrice = 5100;
  ThreadripperQuantity = 0;
  WorkerPrice = 1000;
  WorkerQuantity = 0;
  cryptoPerSecond = 0.0000;
  FasterMinerPrice = 10;
  AltComputerPrice = 100;

  // Clear local storage to remove saved game data
  localStorage.removeItem('cryptoClickerSave');

  // Update the displayed values to reflect the reset
  updateCrypto();
  updateMoney();
  updateRigPriceDisplay();
  updateRTX4090PriceDisplay();
  updateThreadripperPriceDisplay();
  updateWorkerPriceDisplay();
  updateFasterMinerPriceDisplay();
  updateAltComputerPriceDisplay();

  // You can add more game state variables to reset if needed

  // Stop any timers or animations related to the game
  clearInterval(workerTimer);
  clearInterval(altComputerTimer);

  // Optionally, hide any open shop or upgrades pages
  closeShopPage();
  closeUpgradesPage();
}



// Function to create a falling coin
document.addEventListener("click", createFallingCoin);

function createFallingCoin(event) {
  const coinContainer = document.getElementById("coin-container");

  // Create a new image element for the coin
  const coin = new Image();
  coin.src = "images/coin.png";
  coin.classList.add("coin");

  // Calculate random X position within the window width
  const randomX = Math.random() * window.innerWidth;
  
  // Set the initial position of the coin to the calculated random X position
  coin.style.left = `${randomX}px`;
  coin.style.top = "0"; // Set the top position to 0 to start from the top

  // Append the coin to the container
  coinContainer.appendChild(coin);

  // Trigger the coin falling animation
  setTimeout(() => {
    coin.style.transform = `translateY(${window.innerHeight}px)`;
  }, 10);

  // Remove the coin element after the animation completes
  coin.addEventListener("transitionend", () => {
    coin.remove();
  });
}







