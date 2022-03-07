import plans from "./plans/index.js";
import { getUSDPrice } from "./utils.js";

(function main() {
  console.log("main");
  getTable();
})();

const inputNumberOfUsers = document.getElementById("number-of-users");
const inputNumberOfSeniors = document.getElementById("number-of-seniors");

document.getElementById("number-of-users").onchange = () => {
  getTable();
};

document.querySelector(".btn.plus").onclick = () => {
  inputNumberOfUsers.value = parseInt(inputNumberOfUsers.value) + 1;
  getTable();
};

document.querySelector(".btn.minus").onclick = () => {
  inputNumberOfUsers.value = parseInt(inputNumberOfUsers.value) - 1;
  getTable();
};

document.querySelector(".btn.plus-senior").onclick = () => {
  inputNumberOfSeniors.value = parseInt(inputNumberOfSeniors.value) + 1;
  getTable();
};

document.querySelector(".btn.minus-senior").onclick = () => {
  inputNumberOfSeniors.value = parseInt(inputNumberOfSeniors.value) - 1;
  getTable();
};

const getUnlimitedPlanNumberByCarrierName = (carrier, numberOfUsers) => {
  return plans[carrier].getUnlimitedPlanPrice
    ? plans[carrier].getUnlimitedPlanPrice(numberOfUsers)
    : 0;
};

const getUnlimitedPlanPriceByCarrierName = (carrier, numberOfUsers) => {
  return plans[carrier].getUnlimitedPlanPrice
    ? plans[carrier].getUnlimitedPlanPrice(numberOfUsers)
    : "Unkown";
};

function getTable() {
  const tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
  const numberOfUsers = document.getElementById("number-of-users").value;
  const numberOfSenior = document.getElementById("number-of-seniors").value;

  const sortedPlans = Object.entries(plans)
    .sort(
      (a, b) =>
        a[1].getUnlimitedPlanPrice(numberOfUsers) -
        b[1].getUnlimitedPlanPrice(numberOfUsers)
    )
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const getUnlimitedTotalPrice = (carrier) => {
    return plans[carrier].getUnlimitedPlanPrice
      ? plans[carrier].getUnlimitedPlanPrice(numberOfUsers)
      : "Unkown";
  };

  const getUnlimitedBreakdownPrice = (carrier) => {
    return plans[carrier].getUnlimitedPlanPrice
      ? plans[carrier].getUnlimitedPlanPrice(numberOfUsers) / numberOfUsers
      : "Unkown";
  };

  const getUnlimitedSeniorPlanPrice = (carrier) => {
    return plans[carrier].getUnlimitedSeniorPlanPrice
      ? plans[carrier].getUnlimitedSeniorPlanPrice({
          numUsers: parseInt(numberOfUsers),
          numSeniors: parseInt(numberOfSenior),
        })
      : "Unkown";
  };

  Object.keys(sortedPlans).map((item) => {
    // console.log(plans[item]);
    const row = document.createElement("tr");
    row.innerHTML = `<td><a href=${plans[item].website || "#"}>${
      plans[item].label || item
    }</a></td>`;
    row.innerHTML += `<td>${getUSDPrice(getUnlimitedTotalPrice(item))}</td>`;
    row.innerHTML += `<td class="d-none d-md-table-cell">${getUSDPrice(
      getUnlimitedBreakdownPrice(item)
    )}</td>`;
    row.innerHTML += `<td>${getUSDPrice(
      getUnlimitedSeniorPlanPrice(item)
    )}</td>`;
    tBody.append(row);
  });
}
