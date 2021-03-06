import { getUSDPrice } from "../utils.js";
import verizon from "./verizon.js";

export const getBestUnlimitedPrice = (numUsers) => {
  let min = Number.MAX_SAFE_INTEGER;
  let carrier = "";
  Object.values(plans).forEach((item) => {
    const currentUnlimitedPrice = item.getUnlimitedPlanPrice(numUsers);
    if (currentUnlimitedPrice < min) {
      console.log(currentUnlimitedPrice);
      min = currentUnlimitedPrice;
      carrier = item.label;
    }
  });

  return { min, carrier };
};

const att = {
  label: "AT&T",
  getUnlimitedPlanPrice: (numUsers) => {
    console.log("att", numUsers);
    switch (parseInt(numUsers)) {
      case 4:
        return 35 * parseInt(numUsers);
      case 3:
        return 45 * parseInt(numUsers);
      case 2:
        return 60 * parseInt(numUsers);
      case 1:
        return 65 * parseInt(numUsers);
      default:
        return 30 * parseInt(numUsers);
    }
  },
  perks: [{}],
};

const sprint = {
  label: "Sprint",
  getUnlimitedPlanPrice: (numUsers) => {
    switch (parseInt(numUsers)) {
      case 4:
        return 30 * parseInt(numUsers);
      case 3:
        return 35 * parseInt(numUsers);
      case 2:
        return 45 * parseInt(numUsers);
      case 1:
        return 60 * parseInt(numUsers);
      default:
        return 27 * parseInt(numUsers);
    }
  },
  perks: [{}],
};

const tMobile = {
  label: "T-Mobile",
  getUnlimitedSeniorPlanPrice: ({ numUsers, numSeniors }) => {
    console.log(tello.label);
    const { min, carrier } = getBestUnlimitedPrice(numUsers - numSeniors);
    const seniorTotal = numSeniors * 27.5;
    return `<span title="${getUSDPrice(seniorTotal)} + ${getUSDPrice(
      min
    )} (${carrier})">${getUSDPrice(seniorTotal + min)}</span>`;
  },
  getUnlimitedPlanPrice: (numUsers) => {
    numUsers = parseInt(numUsers);
    switch (parseInt(numUsers)) {
      case 4:
        return 27 * numUsers;
      case 3:
        return 30 * numUsers;
      case 2:
        return 45 * numUsers;
      case 1:
        return 60 * numUsers;
      default:
        return 24 * numUsers;
    }
  },
  website: "https://www.t-mobile.com/cell-phone-plans",
};

const tello = {
  label: "Tello Mobile",
  getUnlimitedPlanPrice: (num) => {
    return 39 * num;
  },
  lowestUnitPrice: 39,
  dataUnlimite: true,
  website: "https://tello.com/buy/family_plans",
};

const customerCellular = {
  label: "Customer Cellular",
  getUnlimitedPlanPrice: (numUsers) => {
    numUsers = parseInt(numUsers);
    switch (numUsers) {
      case 1:
        return 55;
      case 2:
        return 75;
      case 3:
        return 90;
      default:
        return 90 + 25 * (numUsers - 3) || 0;
    }
  },
  dataUnlimited: true,
  website: "https://www.consumercellular.com/shopping/choose/plan",
};

const visible = {
  label: "Visible",
  network: "Verizon",
  price: 25.0,
  dataUnlimited: true,
  getUnlimitedPlanPrice: (num) => 25 * parseInt(num),
  comment: `
        For party plan/multiple users plan,
        it requires at least one user to be the member first and then
        create the party plan.`,
  website: "https://www.visible.com/",
};

const usMobile = {
  label: "US Mobile",
  dataUnlimited: true,
  getUnlimitedPlanPrice: (num) => {
    switch (num) {
      case 1:
        return 45;
      case 2:
        return 30;
      default:
        return 25 * num;
    }
  },
  getPriceByData: (numGb, numUser) => {
    switch (numGb) {
      case 0:
        return [8, 7, 6][numUser - 1];
      case 1:
        return numUser * 12;
      case 5:
        return numUser * 15;
      case 12:
        return numUser * 20;
      case 18:
        return numUser * 25;
      case 30:
        return numUser * 30;
      default:
        return "Unkown: no matching data plan was found";
    }
  },
  website: "https://usmobile.com/referrals?data=Y29kZT1KRUdHQVNBJm5hbWU9V2VpamluZw=="
};

const mintMobile = {
  label: "Mint Mobile",
  getUnlimitedPlanPrice: (numUsers) => numUsers * 30,
  lowestUnitPrice: 30,
  dataUnlimted: true,
  website: "https://www.mintmobile.com/plans/",
};

const googleFi = {
  label: "Google Fi",
  getUnlimitedPlanPrice: (numUsers) => {
    switch (numUsers) {
      case 1:
        return 60;
      case 2:
        return 45 * numUsers;
      default:
        return 30 * numUsers;
    }
  },
};

const plans = {
  att,
  customerCellular,
  googleFi,
  mintMobile,
  sprint,
  tello,
  tMobile,
  usMobile,
  verizon,
  visible,
};

export default plans;
