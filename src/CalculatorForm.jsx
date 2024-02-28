import { useState, useEffect, useCallback } from 'react';
import './CalculatorForm.css';

function CalculatorForm() {
  const [companyName, setCompanyName] = useState('');
  const [breweryName, setBreweryName] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [qtyValues, setQtyValues] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
    input7: 0,
    input8: 0,
  });

  const [sizeValues, setSizeValues] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
    input7: 0,
    input8: 0,
  });

  const [totalBbl, setTotalBbl] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
    input7: 0,
    input8: 0,
  });
  const [addedRows, setAddedRows] = useState([]);

  const [bblTot, setBblTot] = useState(0);
  const [totVass, setTotVass] = useState(0);
  const [step1Tot, setStep1Tot] = useState('');
  const [step2Tot, setStep2Tot] = useState('');
  const [totBblFerm, setTotBblFerm] = useState('');
  const [totBblKnock, setTotBblKnock] = useState('');
  const [totHrsKnock, setTotHrsKnock] = useState('');
  const [desireTemp, setDesireTemp] = useState('');
  const [totBblPstKnock, setTotBblPstKnock] = useState('');
  const [coldLiqTank, setColdLiqTank] = useState('No');
  const [cltSize, setCltSize] = useState('');
  const [cltTemp, setCltTemp] = useState('');
  const [cltCoolTemp, setCoolTemp] = useState('');
  const [wortCool, setWortCool] = useState('No');
  const [wortFlow, setWortFlow] = useState('');
  const [wortTime, setWortTime] = useState('');
  const [wortStartTemp, setWortStartTemp] = useState('');
  const [wortEndTemp, setWortEndTemp] = useState('');
  const [wortBatches, setWortBatches] = useState('');
  const [walkInCool, setWalkInCool] = useState('No');
  const [walkInTemp, setWalkInTemp] = useState('');
  const [walkInLength, setWalkInLength] = useState('');
  const [walkInWidth, setWalkInWidth] = useState('');
  const [walkInHeight, setWalkInHeight] = useState('');
  const [walkInBeer, setWalkInBeer] = useState('');
  const [activeFerm, setActiveFerm] = useState(0);
  const [crashCooling, setCrashCooling] = useState(0);
  const [holdingLoad, setHoldingLoad] = useState(0);

  // Calculate each row total by multiplying each Quantity of Vessels by its corresponding Size in BBL
  const calculateTotal = useCallback(() => {
    const newTotalBbl = Object.keys(qtyValues).reduce((acc, key) => {
      const qtyValue = qtyValues[key];
      const sizeValue = sizeValues[key];
      const product = qtyValue * sizeValue;
      return {
        ...acc,
        [key]: product,
      };
    }, {});
    // Set the overall total in totalBbl state
    setTotalBbl(newTotalBbl);
    // Calculate the sum of all key values in newTotalBbl and set it to bblTot
    const overallTotal = Object.values(newTotalBbl).reduce(
      (acc, value) => acc + value,
      0
    );
    setBblTot(overallTotal);
  }, [qtyValues, sizeValues, setTotalBbl, setBblTot]);

  useEffect(() => {
    calculateTotal();
  }, [qtyValues, sizeValues, calculateTotal, desc]);

  const handleQtyChange = (inputName, value) => {
    setQtyValues((prevInputValues) => {
      const updatedValues = {
        ...prevInputValues,
        [inputName]: parseFloat(value) || 0,
      };
      const newTotal = Object.values(updatedValues).reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setTotVass(newTotal);
      return updatedValues;
    });
  };

  const handleSizeChange = (inputName, value) => {
    setSizeValues((prevInputValues) => {
      const updatedValues = {
        ...prevInputValues,
        [inputName]: parseFloat(value) || 0,
      };
      return updatedValues;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform calculations or navigate to a new page here
  };

  return (
    <div>
      <section>
        <div className="form-style-1">
          <form id="survey" onSubmit={handleSubmit}>
            <fieldset className="form-style-2">
              <img
                id="logo"
                src="https://prochiller.com/wp-content/uploads/2018/05/Pro-Chiller-Logo-Dark-Blue.png"
              />
              <input
                type="text"
                name="company"
                value={companyName}
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="text"
                name="brewery"
                value={breweryName}
                placeholder="Brewery Name"
                onChange={(e) => setBreweryName(e.target.value)}
              />
              <input
                type="text"
                name="name"
                value={name}
                required
                placeholder="Name *"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                name="street"
                value={street}
                placeholder="Street"
                onChange={(e) => setStreet(e.target.value)}
              />
              <input
                type="text"
                name="city"
                value={city}
                required
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                name="state"
                value={state}
                pattern="[A-Za-z]{2}"
                title="2 letter State"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
              />
              <input
                type="tel"
                name="tel"
                value={phone}
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                name="email"
                value={email}
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <select id="hear" name="hear">
                <option value="" disabled selected>
                  How Did You Hear About Us?
                </option>
                <option value="Email - Newsletter">Email - Newsletter</option>
                <option value="Print Ad - Wines and Vines">
                  Print Ad - Wines and Vines
                </option>
                <option value="Print Ad - Practical Winery and Vineyard">
                  Print Ad - Practical Winery and Vineyard
                </option>
                <option value="Print Ad - Wine Business Monthly">
                  Print Ad - Wine Business Monthly
                </option>
                <option value="Print Ad - New Brewer">
                  Print Ad - New Brewer
                </option>
                <option value="Print Ad - American Brewer">
                  Print Ad - American Brewer
                </option>
                <option value="Print Ad - American Distilling Institute">
                  Print Ad - American Distilling Institute
                </option>
                <option value="Trade Show">Trade Show</option>
                <option value="Internet - Google">Internet - Google</option>
                <option value="Internet - ProBrewer.com">
                  Internet - ProBrewer.com
                </option>
                <option value="Word of mouth">Word of mouth</option>
                <option value="Current Pro Chiller Owner">
                  Current Pro Chiller Owner
                </option>
              </select>
            </fieldset>
            <fieldset>
              <legend>Survey</legend>
              <div>
                <p>
                  Please provide an itemized list of your current or future
                  Brewing Vessels
                  <br />
                  <br />
                  BREWERY INFORMATION SUMMARY- please list all Fermenters and
                  Glycol Cooled Conditioning or Brite Tanks
                </p>
              </div>
              <div>
                <table id="surveytab">
                  <th>Description</th>
                  <th>Quantity of Vessels</th>
                  <th>Size in BBL</th>
                  <th>Total BBL</th>
                  <tbody className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes1"
                        name="quanVes1"
                        value={qtyValues.input1}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input1', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl1"
                        name="szBbl1"
                        value={sizeValues.input1}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input1', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl1"
                        name="totBbl1"
                        value={totalBbl.input1}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes2"
                        name="quanVes2"
                        value={qtyValues.input2}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input2', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl2"
                        name="szBbl2"
                        value={sizeValues.input2}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input2', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl2"
                        name="totBbl2"
                        value={totalBbl.input2}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes3"
                        name="quanVes3"
                        value={qtyValues.input3}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input3', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl3"
                        name="szBbl3"
                        value={sizeValues.input3}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input3', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl3"
                        name="totBbl3"
                        value={totalBbl.input3}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes4"
                        name="quanVes4"
                        value={qtyValues.input4}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input4', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl4"
                        name="szBbl4"
                        value={sizeValues.input4}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input4', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl4"
                        name="totBbl4"
                        value={totalBbl.input4}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes5"
                        name="quanVes5"
                        value={qtyValues.input5}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input5', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl5"
                        name="szBbl5"
                        value={sizeValues.input5}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input5', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl5"
                        name="totBbl5"
                        value={totalBbl.input5}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tr className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes6"
                        name="quanVes6"
                        value={qtyValues.input6}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input6', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl6"
                        name="szBbl6"
                        value={sizeValues.input6}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input6', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl6"
                        name="totBbl6"
                        value={totalBbl.input6}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes7"
                        name="quanVes7"
                        value={qtyValues.input7}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input7', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl7"
                        name="szBbl7"
                        value={sizeValues.input7}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input7', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl7"
                        name="totBbl7"
                        value={totalBbl.input7}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr className="surveytr">
                    <td>
                      <select id="hear" name="hear">
                        <option value="activeFerm" selected>
                          Active Ferm
                        </option>
                        <option value="crashCooling">Crash Cooling</option>
                        <option value="holdingLoad">Holding Load</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="qt1"
                        id="quanVes8"
                        name="quanVes8"
                        value={qtyValues.input8}
                        placeholder="6 EA"
                        onChange={(e) =>
                          handleQtyChange('input8', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="sz1"
                        id="szBbl8"
                        name="szBbl8"
                        value={sizeValues.input8}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input8', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl8"
                        name="totBbl8"
                        value={totalBbl.input8}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Vassels</b>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="totvass"
                        name="totvass"
                        value={totVass}
                        readOnly
                      />
                    </td>
                    <td>
                      <b>Total BBLs</b>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="finbbltot"
                        name="finbbltot"
                        value={bblTot}
                        readOnly
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </fieldset>
            <br />
            <fieldset>
              <legend>Load Estimate</legend>
              {activeFerm}
              <div>
                <table>
                  <tr>
                    <th colSpan="2">
                      <b>Active Fermentation</b>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <b>Total BBLS in active Fermentation:</b>
                      <br />
                      <i>
                        Total Quantiy (BBLS) in fermentation at any one given
                        time.
                        <br />
                        Formula based on a 72 Hour active Fermentation Time.
                      </i>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="totBblFerm"
                        className="step2"
                        id="totBblFerm"
                        value={totBblFerm}
                        onChange={(e) => setTotBblFerm(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr className="esttr">
                    <th colSpan="2">
                      <b>Knock Down Cooling</b>
                    </th>
                  </tr>
                  <tr className="esttr">
                    <td>
                      <b>Total BBLS in Knock Down:</b>
                      <br />
                      <i>
                        Total Quantity cooling from Fermentation Temp to Holding
                        Temp at any one given time.
                      </i>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="totBblKnock"
                        className="step2"
                        id="totBblKnock"
                        value={totBblKnock}
                        onChange={(e) => setTotBblKnock(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        Total Hours that Knock Down Cooling will Occur (AVG
                        24HRS):
                      </b>
                      <br />
                      <i>
                        Length of Time (HR) that Brew will be Cooled in
                        Knock-Down.
                      </i>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="totHrsKnock"
                        id="totHrsKnock"
                        placeholder="24"
                        value={totHrsKnock}
                        onChange={(e) => setTotHrsKnock(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        Desired Temperature Drop during Knockdown (AVG 30&deg; F
                        TD):
                      </b>
                      <br />
                      <i>
                        The most aggressive temperature drop desired during
                        Knockdown.
                      </i>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="desireTemp"
                        id="desireTemp"
                        value={desireTemp}
                        placeholder="30"
                        onChange={(e) => setDesireTemp(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2">
                      <b>Knock Down Holding</b>
                    </th>
                  </tr>
                  <tr className="esttr">
                    <td>
                      <b>
                        Total BBLS in Post Knock Down Hold or Brite Beer Load:
                      </b>
                      <br />
                      <i>
                        Total Quantiy (BBLS) in Post-Knock Down at any one given
                        time.
                      </i>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="totBblPstKnock"
                        className="step2"
                        id="totBblPstKnock"
                        value={totBblPstKnock}
                        onChange={(e) => setTotBblPstKnock(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="total">
                      <b>Total</b>
                      <br />
                      <i>Should Equal Step 1 Total</i>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="step2Tot"
                        id="step2Tot"
                        value={step2Tot}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </fieldset>
            <fieldset>
              <legend>Questions</legend>
              <div>
                <table className="form-style-1">
                  <tr>
                    <td>
                      <b>Are you using a Cold Liquor Tank?</b>
                      <select
                        id="coldliqtank"
                        name="coldliqtank"
                        onChange={(e) => setColdLiqTank(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {coldLiqTank === 'Yes' && (
                        <div id="coldliqtankq">
                          <table className="form-style-3">
                            <tr>
                              <td>
                                <b>What size cold liquor tank is used?</b>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="tankSize"
                                  placeholder="BBL"
                                  value={cltSize}
                                  onChange={(e) => setCltSize(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>
                                  What is the temperature difference between
                                  starting temperature and desired ending
                                  temperature?
                                </b>
                                <br />
                                <i>
                                  (Starting temperature of 70&deg; minus ending
                                  temperature of 35&deg; = 35&deg;)
                                </i>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="tempDif"
                                  placeholder="&deg;F TD"
                                  value={cltTemp}
                                  onChange={(e) => setCltTemp(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>How quickly is this cooled down?</b>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="coolTime"
                                  placeholder="HRS"
                                  value={cltSize}
                                  onChange={(e) => setCltSize(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <br />
                              </td>
                              <td>
                                <br />
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Do you use glycol for your Wort Cooling?</b>
                      <select
                        id="wortcool"
                        name="wortcool"
                        onChange={(e) => setWortCool(e.target.value)}
                      >
                        <option value="No" selected>
                          No
                        </option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    {wortCool === 'Yes' && (
                      <div id="wortCoolQ">
                        <table className="form-style-3">
                          <tr>
                            <td>
                              <tr>
                                <td>
                                  <b>
                                    What is the Flow Rate you process the Wort
                                    (example 15 Bbl per hour)?
                                  </b>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="wortFlow"
                                    placeholder="BBL"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <select name="wortFlowTime">
                                    <option>30 Min</option>
                                    <option>45 Min</option>
                                    <option>60 Min</option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  How much cooling is done with glycol (example
                                  cooling from 80&deg;F to 70&deg;F)
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="glyStrtTemp"
                                    placeholder="&deg;F Starting Temp"
                                  />
                                </td>
                              </tr>
                              <tr></tr>
                              <tr>
                                <td></td>
                                <td>
                                  <input
                                    type="text"
                                    name="glyEndTemp"
                                    placeholder="&deg;F Ending Temp"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  How many batches per week are you brewing or
                                  plan to brew?
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="batches"
                                    placeholder="Batches"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                              </tr>
                              <tr>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                              </tr>
                            </td>
                          </tr>
                        </table>
                      </div>
                    )}
                  </tr>
                  <tr>
                    <td>
                      <b>
                        Do you wish to utilize glycol to cool your walk-in
                        cooler?
                      </b>
                      <select
                        id="walkincool"
                        name="walkincool"
                        onChange={(e) => setWalkInCool(e.target.value)}
                      >
                        <option value="No" selected>
                          No
                        </option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {walkInCool === 'Yes' && (
                        <div id="walkincoolq">
                          <table className="form-style-3">
                            <tr>
                              <td>
                                <tr>
                                  <td>
                                    <b>
                                      What is the desired walk-in temperature?
                                    </b>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="walkinTemp"
                                      placeholder="&deg;F"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>
                                      What are the dimensions of your walk-in
                                      cooler (L x W x H in feet)
                                    </b>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="walkinCoolerL"
                                      placeholder="Length"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>
                                    <input
                                      type="text"
                                      name="walkinCoolerW"
                                      placeholder="Width"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>
                                    <input
                                      type="text"
                                      name="walkinCoolerH"
                                      placeholder="Height"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>
                                      Is your walk-in cooler primarily for beer
                                      storage?
                                    </b>
                                  </td>
                                  <td>
                                    <select name="walkinStorage">
                                      <option>No</option>
                                      <option>Yes</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <br />
                                  </td>
                                  <td>
                                    <br />
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              </div>
            </fieldset>
            <fieldset>
              <legend>Notes</legend>
              <textarea name="notes" placeholder="Notes"></textarea>
            </fieldset>
            <table>
              <tr>
                <td>
                  <div className="submit">
                    <input type="submit" value="Submit" />
                  </div>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </section>
    </div>
  );
}
export default CalculatorForm;
