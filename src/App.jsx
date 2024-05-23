import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
// import { Accordion, Card, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

function App() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState(false);

  const csvData = [
    [
      "Age",
      "Mean_Height",
      "SD_Height",
      "Mean_Weight",
      "SD_Weight",
      "Median_BMI",
      "SD_BMI",
    ],
    [16, 146.8, 3.252691193, 39.45, 5.444722215, 18.37555553, 3.340010494],
    [
      17, 152.2166667, 4.815935558, 48.02777778, 7.19810478, 20.34614504,
      2.547445582,
    ],
    [
      18, 176.2094203, 142.9927623, 74.75362319, 160.5649629, 19.72560963,
      3.8417452,
    ],
    [
      19, 176.7715753, 138.4393367, 68.32260274, 135.3359368, 20.34394847,
      3.785552885,
    ],
    [
      20, 176.1104561, 136.5672128, 73.04816463, 150.4203809, 20.20287721,
      3.69270112,
    ],
    [
      21, 179.6437925, 145.8838405, 78.89379252, 163.8919165, 20.34614287,
      3.995195201,
    ],
    [
      22, 174.007388, 129.1416129, 72.71039085, 145.0944354, 20.66625771,
      3.759046152,
    ],
    [
      23, 187.0287938, 163.6093257, 87.80120623, 183.6819047, 20.76916955,
      8.500412684,
    ],
    [
      24, 180.0971352, 145.8273242, 79.28287808, 159.2440542, 21.22843951,
      4.083652005,
    ],
    [
      25, 177.4151414, 137.9073588, 78.33423575, 154.6594238, 21.45307995,
      4.571980506,
    ],
    [
      26, 181.4510097, 148.6352212, 83.39795142, 165.8163483, 21.67077347,
      4.663734002,
    ],
    [
      27, 185.7215919, 158.5822817, 89.25934066, 177.5529284, 22.14344673,
      4.684187594,
    ],
    [
      28, 172.7799833, 122.4331931, 75.29674729, 137.1018185, 22.41599708,
      4.53229502,
    ],
    [
      29, 180.2230896, 144.213432, 84.12576007, 160.2281582, 22.77718155,
      4.918166584,
    ],
    [
      30, 179.0487627, 141.6186332, 82.41716371, 156.7013893, 22.56520312,
      4.78109591,
    ],
    [
      31, 183.5093067, 152.6058176, 88.82117427, 170.4999243, 23.14778072,
      4.803033424,
    ],
    [
      32, 186.8887698, 161.1477657, 92.16294028, 178.8516069, 23.13575828,
      4.941589006,
    ],
    [
      33, 188.0285714, 163.4005558, 93.73746032, 180.6403426, 23.23788616,
      5.187547169,
    ],
    [
      34, 176.2192804, 131.7839139, 81.76983395, 147.176383, 23.36614991,
      4.927779902,
    ],
    [
      35, 188.2524914, 164.7132515, 93.42465636, 179.9936195, 23.51311347,
      5.331482196,
    ],
    [
      36, 173.7025111, 124.5405304, 77.33500739, 134.5200846, 23.07132239,
      4.977859913,
    ],
    [
      37, 187.4200795, 161.1661357, 91.48270378, 170.3516659, 24.00784624,
      5.472089747,
    ],
    [
      38, 193.4880435, 176.561108, 101.4426087, 196.9657679, 23.54484413,
      5.419708693,
    ],
    [
      39, 188.8964844, 163.8459701, 97.20703125, 182.685129, 24.16295105,
      5.580378828,
    ],
    [
      40, 175.1016529, 131.8385244, 82.92561983, 147.1102835, 23.74635701,
      6.482900467,
    ],
    [
      41, 229.42, 241.915941, 144.6477778, 268.7536779, 24.77245878,
      6.426813628,
    ],
    [
      42, 169.0843478, 111.0776326, 73.68347826, 124.2311067, 23.03436484,
      5.562543573,
    ],
    [
      43, 153.8369863, 6.923821738, 58.46438356, 11.41457852, 23.40666864,
      4.632711924,
    ],
    [
      44, 168.4945455, 114.4908122, 72.54, 127.9061818, 23.02627972,
      6.348463275,
    ],
    [
      45, 154.8053571, 7.921419057, 52.27857143, 9.301177135, 22.50791286,
      3.427803397,
    ],
    [
      46, 153.7434783, 5.310694706, 55.41304348, 8.92179682, 23.13825685,
      3.358899655,
    ],
    [47, 155.1625, 7.902056694, 59.25, 11.11485492, 23.15352006, 4.146683997],
    [
      48, 231.1, 248.7643769, 143.9727273, 277.0620064, 23.70234808,
      5.554389976,
    ],
    [49, 153.075, 4.441605244, 59.8, 9.53040248, 24.24244464, 4.443950052],
    // Add more rows as needed
  ];

  function calculateMetrics(data, age, height, weight) {
    const rowIndex = data.findIndex((row) => row[0] == age);

    if (rowIndex === -1) {
      console.error("Data not found for the given age.");
      return;
    }

    // Extract relevant data from the row
    const meanHeight = data[rowIndex][1];
    const sdHeight = data[rowIndex][2];
    const meanWeight = data[rowIndex][3];
    const sdWeight = data[rowIndex][4];
    const medianbmi = data[rowIndex][5];
    const sdbmi = data[rowIndex][6];
    // Calculate metrics
    const haz = ((height - meanHeight) / sdHeight) * 100;

    const waz = (weight - meanWeight) / sdWeight;
    const whz = (weight - meanHeight * meanWeight) / sdHeight;
    // const bmi_for_age = (weight / height ** 2 - medianbmi) / sdbmi;
    const bmi = weight / (height / 100) ** 2;

    // Return calculated metrics
    // return { haz, waz, whz, bmiForAge };

    // Return calculated metrics

    classifyNutritionalStatus(whz, waz, haz, bmi);
    // console.log("Nutritional status:", status);
    // alert("CONGRATULATIONS!!!!!!!!!!!!! YOU ARE SHERWIN - " + status);

    return { haz, waz, whz, bmi };
  }

  function classifyNutritionalStatus(whz, waz, haz, bmi) {
    let result = "";
    if (bmi < 18.5) {
      console.log("Underweight");
      result = result + "Underweight, ";
    } else if (bmi > 25) {
      console.log("Overweight");
      result = result + "Overweight, ";
    } else if (bmi >= 18.5 && bmi <= 25) {
      console.log("Normal weight");
      result = result + "Normal Weight,a ";
    }

    if (haz <= -3) {
      console.log("stunted");
      result = result + "stunted";
    } else if (height - weight > 120) {
      console.log("wasted");
      result = result + "wasted";
    } else {
      console.log("Normal");
      result = result + "Normal";
    }
    alert("CONGRATULATIONS, YOU ARE: " + result);

    // if (bmi < 18.5) console.log("Underweight");
    // else if (bmi >= 18.5 && bmi <= 25)
    // else console.log("Overweight");
  }

  useEffect(() => {
    // const csvData = fetchData();

    // Function to parse CSV data and calculate metrics
    const obj = calculateMetrics(csvData, age, height, weight);
    console.log(obj);
  }, [gender]);

  return (
    <>
      <div className="">
        <form className="max-w-md mx-auto">
          <div className="relative z-0 w-full my-5 mt-20 group">
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              name="age"
              id="age"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="age"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              onChange={(e) => setHeight(e.target.value)}
              name="height"
              id="height"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="height"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Height
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              onChange={(e) => setWeight(e.target.value)}
              name="weight"
              id="weight"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="weight"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Weight
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="hip_circum"
                id="hip_circum"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="hip_circum"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Hip Circumference
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How to measure?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <img src="src\assets\Waist-Circumference.jpeg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="waist_circum"
                id="waist_circum"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="waist_circum"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Waist Circumference
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="arm_circum"
                id="arm_circum"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="arm_circum"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Arm Circumference
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="head_circum"
                id="head_circum"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="head_circum"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Head Circumference
              </label>
            </div>
          </div>
          <label
            htmlFor="States"
            className="block mb-3 text-sm font-medium text-gray-900"
          >
            Select your Gender
          </label>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="gender"
                type="radio"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="gender"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Male
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="gender"
                type="radio"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="gender"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Female
              </label>
            </div>
          </div>
          <label
            htmlFor="States"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select an option
          </label>
          <select
            id="States"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Choose a State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Orissa">Orissa</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Tripura">Tripura</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli">
              Dadra and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Pondicherry">Pondicherry</option>
          </select>
          <label
            htmlFor="alcohol"
            className="block my-4 text-sm font-medium text-gray-900"
          >
            Do you drink alcohol?
          </label>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="alcohol"
                type="radio"
                value=""
                name="alcohol"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="alcohol"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="alcohol"
                type="radio"
                value=""
                name="alcohol"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="alcohol"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                No
              </label>
            </div>
          </div>
          {gender ? (
            <></>
          ) : (
            <>
              <label
                htmlFor="pregnant"
                className="block my-4 text-sm font-medium text-gray-900"
              >
                Are you Pregnant?
              </label>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full group">
                  <input
                    id="preg"
                    type="radio"
                    value=""
                    name="preg"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
                  />
                  <label
                    htmlFor="preg"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Yes
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    id="preg"
                    type="radio"
                    value=""
                    name="preg"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
                  />
                  <label
                    htmlFor="preg"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    No
                  </label>
                </div>
              </div>
            </>
          )}
          <label
            htmlFor="diabetes"
            className="block my-4 text-sm font-medium text-gray-900"
          >
            Are you diabetic?
          </label>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group">
              <input
                id="diabetes"
                type="radio"
                value=""
                name="diabetes"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="diabetes"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="diabetes"
                type="radio"
                value=""
                name="diabetes"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="diabetes"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                No
              </label>
            </div>
          </div>
          <label
            htmlFor="hypertension"
            className="block my-4 text-sm font-medium text-gray-900"
          >
            Do you have Hypertension?
          </label>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group">
              <input
                id="hypertension"
                type="radio"
                value=""
                name="hypertension"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="hypertension"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="hypertension"
                type="radio"
                value=""
                name="hypertension"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="hypertension"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                No
              </label>
            </div>
          </div>
          <label
            htmlFor="heart-disease"
            className="block my-4 text-sm font-medium text-gray-900"
          >
            Do you have a heart disease?
          </label>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group">
              <input
                id="heart-disease"
                type="radio"
                value=""
                name="heart-disease"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="heart-disease"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="heart-disease"
                type="radio"
                value=""
                name="heart-disease"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="heart-disease"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                No
              </label>
            </div>
          </div>
          <label
            htmlFor="cancer"
            className="block my-4 text-sm font-medium text-gray-900"
          >
            Do you cancer?
          </label>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group">
              <input
                id="cancer"
                type="radio"
                value=""
                name="cancer"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="cancer"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="cancer"
                type="radio"
                value=""
                name="cancer"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="cancer"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                No
              </label>
            </div>
          </div>
          <label
            htmlFor="smoke"
            className="block my-4 text-sm font-medium text-gray-900"
          >
            Do you smoke?
          </label>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group">
              <input
                id="smoke"
                type="radio"
                value=""
                name="smoke"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="smoke"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="smoke"
                type="radio"
                value=""
                name="smoke"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
              />
              <label
                htmlFor="smoke"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                No
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {/* <div id="f1">
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded="true"
              aria-controls="accordion-collapse-body-1"
            >
              <span>What is Flowbite?</span>

              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            class="hidden"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is an open-source library of interactive components
                built on top of Tailwind CSS including buttons, dropdowns,
                modals, navbars, and more.
              </p>
              <p class="text-gray-500 dark:text-gray-400">
                Check out this guide to learn how to{" "}
                <a
                  href="/docs/getting-started/introduction/"
                  class="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  get started
                </a>{" "}
                and start developing websites even faster with components on top
                of Tailwind CSS.
              </p>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
          >
            <span>What is Flowbite?</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          class="hidden"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div class="p-5 border border-b-0 border-gray-200 ">
            <p class="mb-2 text-gray-500 ">
              Flowbite is an open-source library of interactive components built
              on top of Tailwind CSS including buttons, dropdowns, modals,
              navbars, and more.
            </p>
            <p class="text-gray-500 ">
              Check out this guide to learn how to{" "}
              <a
                href="/docs/getting-started/introduction/"
                class="text-blue-600 hover:underline"
              >
                get started
              </a>{" "}
              and start developing websites even faster with components on top
              of Tailwind CSS.
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default App;
