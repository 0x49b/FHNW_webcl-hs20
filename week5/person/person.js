import {ObservableList, Observable}                                     from "../observable/observable.js";
import {Attribute, LABEL}                                               from "../presentationModel/presentationModel.js";
import {personListProjector, personFormProjector, personTableProjector} from "./personProjector.js";

export { MasterController, MasterView, SelectionController, DetailView };

const Person = () => {                               // facade
    const firstnameAttr = Attribute("Monika");
    firstnameAttr.getObs(LABEL).setValue("First Name");

    const lastnameAttr  = Attribute("Mustermann");
    lastnameAttr.getObs(LABEL).setValue("Last Name");

    // lastnameAttr.setConverter( input => input.toUpperCase() );
    // lastnameAttr.setValidator( input => input.length >= 3   );

    return {
        firstname:          firstnameAttr,
        lastname:           lastnameAttr,
    }
};

const MasterController = () => {

    const personListModel = ObservableList([]); // observable array of Todos, this state is private

    return {
        addPerson:            () => personListModel.add(Person()),
        removePerson:         personListModel.del,
        onPersonAdd:          personListModel.onAdd,
        onPersonRemove:       personListModel.onDel,
    }
};


// View-specific parts

const MasterView = (masterController, selectionController, rootElement) => {
    // personListProjector(masterController, selectionController, rootElement.querySelector("#listContainer"));
    personTableProjector(masterController, selectionController, rootElement.querySelector("#tableContainer"));
};

const NoPerson = (() => { // one time creation, singleton
    const johnDoe = Person();
    johnDoe.firstname.setConvertedValue("");
    johnDoe.lastname.setConvertedValue("");
    return johnDoe;
})();

const SelectionController = () => {

    const selectedPersonObs = Observable(NoPerson);

    return {
        setSelectedPerson : selectedPersonObs.setValue,
        getSelectedPerson : selectedPersonObs.getValue,
        onPersonSelected:   selectedPersonObs.onChange,
        clearSelection:     () => selectedPersonObs.setValue(NoPerson),
    }
};


const DetailView = (selectionController, rootElement) => {

    const render = person =>
        personFormProjector(selectionController, rootElement, person);

    selectionController.onPersonSelected(render);
};
