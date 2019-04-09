/**
 * This file is taken out of the iptc/rightsml-dev project (published under the
 * MIT license) and slightly edited. The license can be found at ./LICENSE.md.
 */

/**
* This module provides each currently defined RightsML Controlled Vocabulary
* as a class.
*
* @author Copyright Michael W. Steidl (www.linkedin.com/in/michaelwsteidl)
* Published under MIT license (see http://www.opensource.org/licenses/MIT)
* development timestamp: 2014-06-25
*/
export var RightsML;
(function (RightsML) {
  // Constant values:
  RightsML.nsUri = 'http://iptc.org/std/RightsML/2011-10-07/';

  const ActionsCV = (function () {
    function ActionsCV() {
    }
    ActionsCV.archive = `${RightsML.nsUri}archive`;
    ActionsCV.copy = `${RightsML.nsUri}copy`;
    ActionsCV.distribute = `${RightsML.nsUri}distribute`;
    ActionsCV.removeFromService = `${RightsML.nsUri}removeFromService`;
    return ActionsCV;
  }());
  RightsML.ActionsCV = ActionsCV;

  const ConstraintsCV = (function () {
    function ConstraintsCV() {
    }
    ConstraintsCV.actionRequestReceived = `${RightsML.nsUri}actionRequestReceived`;
    ConstraintsCV.requestedActionsPerformed = `${RightsML.nsUri}requestedActionsPerformed`;
    return ConstraintsCV;
  }());
  RightsML.ConstraintsCV = ConstraintsCV;

  const RightOperandsCV = (function () {
    function RightOperandsCV() {
    }
    RightOperandsCV.requestReceivedDateTime = `${RightsML.nsUri}requestReceivedDateTime`;
    RightOperandsCV.serviceDevelopment = `${RightsML.nsUri}serviceDevelopment`;
    RightOperandsCV.serviceDemonstration = `${RightsML.nsUri}serviceDemonstration`;
    RightOperandsCV.serviceTesting = `${RightsML.nsUri}serviceTesting`;
    return RightOperandsCV;
  }());
  RightsML.RightOperandsCV = RightOperandsCV;
}(RightsML || (RightsML = {})));
// # sourceMappingURL=RightsMLvocabs.js.map
