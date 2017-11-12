import switchcase from 'utils/switchcase';
import { loadState, saveState } from 'utils/localStorage';

class serforService {
  endpoint = process.env.REACT_APP_ONPE_URL;

  async login(credentials) {
    const url = `${this.endpoint}/api-token-auth/`;

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.dni,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    return {
      session: {
        token: data.token
      },
    };
  }

  async registerGuide(form) {
    const url = `${this.endpoint}/api/v1/reported-cases/${form.id}/`;

    const session = loadState('session');

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: form.id,
        entry_type: form.receptionType,
        procedence: form.geographicProcedence,
        decomisation_type: form.decomisationPlace,
        encierroType: form.enclosure_type,
        encierroTime: form.enclosure_time,
        especies_contact: form.contactWithSpecies,
        short_story: form.shortStory,
        common_name: form.naturalName,
        scientific_name: form.scientificName,
        gender: form.gender,
        weight: form.weight,
        age: form.age,
        diet: form.diet,
        behave: form.behave,
        weight_type: form.weightCondition,
        skin_type: form.skinType,
        muda: form.muda,
        diseases: form.diseases,
        treatment: form.treatment,
        status: form.status,
        injurie: form.injurie,
        destinateType: form.destinate_type,
        status: 4,
      }),
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    return {
      success: true,
    };
  }

  async getProceduresStatistics() {
    const url = `${this.endpoint}/api/v1/reported-cases/summary`;

    const session = loadState('session');

    const response = await fetch(url);

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    return {
      done: data.done,
      accepted: data.accepted,
      denied: data.denied,
      inProcess: data.in_process,
      recent: data.recent,
    };
  }

    async getComplaints(status) {
    const params = status ? `?status=${status}` : '';
    const url = `${this.endpoint}/api/v1/reported-cases/${params}`;

    const session = loadState('session');

    const response = await fetch(url);

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    const complaints = data.map(element => ({
      id: element.id,
      registerDate: element.created,
      attendedDate: element.attended_date,
      rejectedDate: element.rejected_date,
      acceptedDate: element.accepted_date,
      comment: element.comment,
      urlPhoto: element.url_media,
      latitude: element.latitude,
      longitude: element.longitude,
      isCaptured: element.is_captured,
      isForSale: element.is_for_sale,
      isPet: element.is_owned,
      receptionType: element.entry_type,
      geographicProcedence: element.procedence,
      decomisationPlace: element.decomisation_type,
      enclosureType: element.encierro_type,
      enclosureTime: element.encierro_time,
      contactWithSpecies: element.especies_contact,
      shortStory: element.short_story,
      naturalName: element.common_name,
      scientificName: element.scientific_name,
      gender: element.gender,
      weight: element.weight,
      age: element.age,
      diet: element.diet,
      behave: element.behave,
      weightCondition: element.weight_type,
      skinType: element.skin_type,
      muda: element.muda,
      diseases: element.diseases,
      treatment: element.treatment,
      status: element.status,
      photoType: element.media_type,
      injurie: element.injurie,
      dni: element.dni,
      destinateType: element.destinate_type,
    }));

    return {
      complaints: complaints
    };
  }

  async changeStatus(id, status, atf) {
    const url = `${this.endpoint}/api/v1/reported-cases/${id}/`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status,
        atf_id: atf,
      })
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    return {
      success: true,
    };
  }

  async getHistory(id) {
    const url = `${this.endpoint}/api/v1/user/${id}/history`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    const procedure = {
      id: data.id,
      name: data.name,
      type: data.type,
      history: data.history && data.history.map(element => ({
        registerDate: element.register_date,
        status: element.status,
        statusCode: element.status_code,
      })),
    };

    return {
      procedure: procedure,
    };
  }
}

export default new serforService();
