import { getUSDPrice } from "./utils.js";

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

const tMobile = {
  label: "T-Mobile",
  getUnlimitedSeniorPlanPrice: ({ numUsers, numSeniors }) => {
    console.log(tello.label);
    const { min, carrier } = getBestUnlimitedPrice(numUsers - numSeniors);
    const seniorTotal = numSeniors * 27.5;
    return `${getUSDPrice(seniorTotal + min)}: ${getUSDPrice(
      seniorTotal
    )} + ${getUSDPrice(min)} (${carrier})`;
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

const verizon = (() => {
  const verizonPlans = {
    "5G Start": [70, 60, 45, 35, 30],
  };

  const getUnlimitedPlanPrice = (numberOfUsers) => {
    const { length } = verizonPlans["5G Start"];
    if (numberOfUsers < length) {
      return numberOfUsers * verizonPlans["5G Start"][numberOfUsers - 1];
    } else {
      return numberOfUsers * verizonPlans["5G Start"][length - 1];
    }
  };

  return {
    label: "Verizon",
    website: "https://www.verizon.com/plans/unlimited/#plans",
    getUnlimitedPlanPrice: getUnlimitedPlanPrice,
    perks: [
      {
        name: "5G Start",
        price: getUnlimitedPlanPrice,
        VideoStream: { name: "Disney+ 6 mo" },
        Game: [
          { name: "Apple Carcade 6 mo" },
          { name: "Google Play Pass 6 mo" },
        ],
        Music: [{ name: "Apple Music 6 mo" }],
      },
      {
        name: "5G Play More",
        price: 45,
        perkValue: 18.98,
        VideoStream: { name: "Disney+ Bunlde" },
        Game: [{ name: "Apple Carcade" }, { name: "Google Play Pass" }],
        Music: [{ name: "Apple Music 6 mo" }],
      },
      {
        name: "5G Do More",
        price: 45,
        perkValue: 35.99,
        internet: { name: "50% off hotspot" },
        network: { name: "12 mo 1 TravelPass" },
        cloud: { name: "Verizon Cloud 600 GB" },
        VideoStream: { name: "Disney+ Bunlde 6 mo" },
        Game: [
          { name: "Apple Carcade 6 mo" },
          { name: "Google Play Pass 6 mo" },
        ],
        Music: [{ name: "Apple Music 6 mo" }],
      },
      {
        name: "5G Get More",
        price: 55,
        perkValue: 64.96,
        internet: { name: "50% off hotspot" },
        network: { name: "12 mo 1 TravelPass" },
        cloud: { name: "Verizon Cloud 600 GB" },
        VideoStream: { name: "Disney+ Bunlde" },
        Game: [{ name: "Apple Carcade" }, { name: "Google Play Pass" }],
        Music: [{ name: "Apple Music" }],
      },
    ],
  };
})();

const plans = {
  att,
  customerCellular,
  googleFi,
  mintMobile,
  tello,
  tMobile,
  usMobile,
  verizon,
  visible,
};

export default plans;
