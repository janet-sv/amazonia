import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { loadState } from 'utils/localStorage';
import serforService from 'services/serfor';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import ConfirmModal from 'components/ConfirmModal';
import contractIcon from 'assets/images/file-blue.svg';
import nextIcon from 'assets/images/next-blue.svg';
import './styles.scssm';

class FirstService extends PureComponent {
  state = {
    session: loadState('session') || null,
    receptionType: null,
    receptionTypeList: [{
      id: 1,
      name: 'Abandono/Hallazgo',
    }, {
      id: 2,
      name: 'Decomiso o intervención',
    }, {
      id: 3,
      name: 'Entrega voluntaria',
    }],
    decomisationPlace: null,
    decomisationPlaceList: [{
      id: 1,
      name: 'Mercado',
    }, {
      id: 2,
      name: 'Casa',
    }, {
      id: 3,
      name: 'Circo',
    }, {
      id: 4,
      name: 'Medio de transporte',
    }],
    enclosureType: null,
    enclosureTypeList: [{
      id: 1,
      name: 'Jaula',
    }, {
      id: 2,
      name: 'Caja',
    }, {
      id: 3,
      name: 'Redes',
    }, {
      id: 4,
      name: 'Terrario',
    }, {
      id: 5,
      name: 'Batea',
    }, {
      id: 6,
      name: 'Costal',
    }, {
      id: 7,
      name: 'Canasta',
    }],
    gender: null,
    genderList: [{
      id: 1,
      name: 'Hembra',
    }, {
      id: 2,
      name: 'Macho',
    }, {
      id: 3,
      name: 'Indeterminado',
    }],
    age: null,
    ageList: [{
      id: 1,
      name: 'Cría',
    }, {
      id: 2,
      name: 'Juvenil',
    }, {
      id: 3,
      name: 'Adulto',
    }, {
      id: 4,
      name: 'Indeterminado',
    }],
    behave: null,
    behaveList: [{
      id: 1,
      name: 'Decaído',
    }, {
      id: 2,
      name: 'Alerta',
    }, {
      id: 3,
      name: 'Asustado',
    }, {
      id: 4,
      name: 'Agresivo',
    }, {
      id: 5,
      name: 'Estereotipado',
    }],
    weightCondition: null,
    weightConditionList: [{
      id: 1,
      name: 'En sobrepeso',
    }, {
      id: 2,
      name: 'Buen estado',
    }, {
      id: 3,
      name: 'Delgado o bajo de peso',
    }, {
      id: 4,
      name: 'Muy delgado',
    }],
    skinType: null,
    skinTypeList: [{
      id: 1,
      name: 'Buena',
    }, {
      id: 2,
      name: 'Aceptable',
    }, {
      id: 3,
      name: 'Pobre',
    }],
    muda: null,
    mudaList: [{
      id: 1,
      name: 'Sí',
    }, {
      id: 2,
      name: 'No',
    }],
    destinateType: null,
    destinateTypeList: [{
      id: 1,
      name: 'Liberación',
    }, {
      id: 2,
      name: 'Cautiverio',
    }, {
      id: 3,
      name: 'Eutanasia',
    }],
    isConfirmModalOpened: false,
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }
  };

  finishRegister = () => {
    this.props.history.push('/denuncias');
  };

  registerGuide = async () => {
    const {
      receptionType,
      decomisationPlace,
      enclosureType,
      gender,
      age,
      behave,
      weightCondition,
      skinType,
      muda,
      destinateType,
    } = this.state;

    this.setState({
      isConfirmModalOpened: true,
    });

    try {
      await serforService.registerGuide({
        id: this.props.match.params.id,
        receptionType: receptionType,
        geographicProcedence: this.refs.geographicProcedenceInput.getValue(),
        decomisationPlace: decomisationPlace,
        enclosureType: enclosureType,
        enclosureTime: this.refs.enclosureTimeInput.getValue(),
        contactWithSpecies: this.refs.contactWithSpeciesInput.getValue(),
        shortStory: this.refs.shortStoryInput.getValue(),
        naturalName: this.refs.naturalNameInput.getValue(),
        scientificName: this.refs.scientificNameInput.getValue(),
        gender: gender,
        weight: this.refs.weightInput.getValue(),
        age: age,
        behave: behave,
        weightCondition: weightCondition,
        muda: muda === '1',
        diseases: this.refs.diseasesInput.getValue(),
        treatment: this.refs.treatmentInput.getValue(),
        destinateType: destinateType,
      });

    } catch(error) {
      console.log(error);
    }
  };

  render() {
    const {
      isConfirmModalOpened,
      receptionType,
      receptionTypeList,
      decomisationPlace,
      decomisationPlaceList,
      enclosureType,
      enclosureTypeList,
      gender,
      genderList,
      age,
      ageList,
      behave,
      behaveList,
      weightCondition,
      weightConditionList,
      skinType,
      skinTypeList,
      muda,
      mudaList,
      destinateType,
      destinateTypeList,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu/>
        <div styleName="content">
          <div styleName="wrapper">
            <h2 styleName="subtitle">RECEPCIÓN DE DECOMISO O HALLAZGOS</h2>
            <div styleName="cards">
              <div styleName="card" className="has-shadow">
                <p styleName="text"><strong>Información de recepción e historial del espécimen</strong></p>
                <div styleName="group">
                  <div styleName="group-item">
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>1. Tipo de ingreso</p>
                      <div>
                        {
                          receptionTypeList.map(option => (
                            <div key={`receptionType-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`receptionType-${option.id}`}
                                type="radio" value={`receptionType-${option.id}`} name="receptionType"
                                onChange={(e) => {this.setState({receptionType: option.id})}}
                                checked={receptionType === option.id}
                              /> <label htmlFor={`receptionType-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <Input ref="geographicProcedenceInput" label="2. Procedencia geográfica del especímen (Si se conoce)" required/>
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>3. El decomiso o intervención fue realizado en</p>
                      <div>
                        {
                          decomisationPlaceList.map(option => (
                            <div key={`decomisationPlace-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`decomisationPlace-${option.id}`}
                                type="radio" value={`decomisationPlace-${option.id}`} name="decomisationPlace"
                                onChange={(e) => {this.setState({decomisationPlace: option.id})}}
                                checked={decomisationPlace === option.id}
                              /> <label htmlFor={`decomisationPlace-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <Input ref="enclosureTimeInput" label="4. Tiempo de cautiverio (días, meses o años di es que se sabe)" required/>
                  </div>
                  <div styleName="group-item">
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>5. Tipo de encierro</p>
                      <div>
                        {
                          enclosureTypeList.map(option => (
                            <div key={`enclosureType-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`enclosureType-${option.id}`}
                                type="radio" value={`enclosureType-${option.id}`} name="enclosureType"
                                onChange={() => {this.setState({enclosureType: option.id})}}
                                checked={enclosureType === option.id}
                              /> <label htmlFor={`enclosureType-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <Input ref="contactWithSpeciesInput" label="6. Especies (domésticas o silvestres) con las que ha estado en contacto" required/>
                    <Input ref="shortStoryInput" label="7. Breve historia del animal" required/>
                  </div>
                </div>
                <p styleName="text"><strong>Información del espécimen</strong></p>
                <div styleName="group">
                  <div styleName="group-item">
                    <Input ref="naturalNameInput" label="8. Nombre común" required/>
                    <Input ref="scientificNameInput" label="9. Nombre científico" required/>
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>10. Sexo</p>
                      <div>
                        {
                          genderList.map(option => (
                            <div key={`gender-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`gender-${option.id}`}
                                type="radio" value={`gender-${option.id}`} name="gender"
                                onChange={() => {this.setState({gender: option.id})}}
                                checked={gender === option.id}
                              /> <label htmlFor={`gender-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <Input ref="weightInput" label="11. Peso aproximado (kg)" required/>
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>12. Edad aproximada</p>
                      <div>
                        {
                          ageList.map(option => (
                            <div key={`age-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`age-${option.id}`}
                                type="radio" value={`age-${option.id}`} name="age"
                                onChange={() => {this.setState({age: option.id})}}
                                checked={age === option.id}
                              /> <label htmlFor={`age-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <Input ref="dietInput" label="13. Dieta suministrada previamente (si se conoce)" required/>
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>14. Comportamiento</p>
                      <div>
                        {
                          behaveList.map(option => (
                            <div key={`behave-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`behave-${option.id}`}
                                type="radio" value={`behave-${option.id}`} name="behave"
                                onChange={() => {this.setState({behave: option.id})}}
                                checked={behave === option.id}
                              /> <label htmlFor={`behave-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div styleName="group-item">
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>15. Condición corporal</p>
                      <div>
                        {
                          weightConditionList.map(option => (
                            <div key={`weightCondition-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`weightCondition-${option.id}`}
                                type="radio" value={`weightCondition-${option.id}`} name="weightCondition"
                                onChange={() => {this.setState({weightCondition: option.id})}}
                                checked={weightCondition === option.id}
                              /> <label htmlFor={`weightCondition-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>16. Condición de piel, pelaje, plumaje</p>
                      <div>
                        {
                          skinTypeList.map(option => (
                            <div key={`skinType-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`skinType-${option.id}`}
                                type="radio" value={`skinType-${option.id}`} name="skinType"
                                onChange={() => {this.setState({skinType: option.id})}}
                                checked={skinType === option.id}
                              /> <label htmlFor={`skinType-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div>
                      <p style={{fontWeight: '500', marginBottom: '10px'}}>17. Muda</p>
                      <div>
                        {
                          mudaList.map(option => (
                            <div key={`muda-${option.id}`} style={{margin: '15px 0'}}>
                              <input
                                id={`muda-${option.id}`}
                                type="radio" value={`muda-${option.id}`} name="muda"
                                onChange={() => {this.setState({muda: option.id})}}
                                checked={muda === option.id}
                              /> <label htmlFor={`muda-${option.id}`}>{option.name}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <Input ref="diseasesInput" label="18. Signos de enfermedad, alteraciones o lesiones registradas" required/>
                    <Input ref="treatmentInput" label="19. Tratamiento suministrado (medicamento, dosis y médico veterinario responsable)" required/>
                  </div>
                </div>
                <p styleName="text"><strong>Destino final del espécimen</strong></p>
                <div>
                  <p style={{fontWeight: '500', marginBottom: '10px'}}>20. Destino final</p>
                  <div>
                    {
                      destinateTypeList.map(option => (
                        <div key={`destinateType-${option.id}`} style={{margin: '15px 0'}}>
                          <input
                            id={`destinateType-${option.id}`}
                            type="radio" value={`destinateType-${option.id}`} name="destinateType"
                            onChange={() => {this.setState({destinateType: option.id})}}
                            checked={destinateType === option.id}
                          /> <label htmlFor={`destinateType-${option.id}`}>{option.name}</label>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div style={{marginTop: '20px', textAlign: 'center'}}>
                  <Button onClick={this.registerGuide}>
                    CONTINUAR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConfirmModal
          active={isConfirmModalOpened}
          onClose={() => { this.setState({isConfirmModalOpened: false}) }}
          onSubmit={this.finishRegister}
        />
      </div>
    );
  }
}

export default FirstService;