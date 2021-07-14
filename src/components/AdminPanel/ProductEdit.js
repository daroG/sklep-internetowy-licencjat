import {
    Row,
    Col,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup, ListGroupItem
} from "reactstrap";
import React, {useEffect, useState} from "react";
import {Logger} from "../../utils/Logger";
import Helpers from "../../Helpers";
import {FilePond, registerPlugin} from "react-filepond";

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {Axios} from "../../Context";
import axios from "axios";

const URL_FILE_UPLOAD = "auth/new-file";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const server={
    timeout: 99999,
    process: (fieldName, file, metadata, load, error, progress, abort) => {

        const formData = new FormData();
        formData.append('newFile', file, file.name);

        // aborting the request
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        Axios({
            method: 'POST',
            url: URL_FILE_UPLOAD,
            data: formData,
            cancelToken: source.token,
            onUploadProgress: (e) => {
                // updating progress indicator
                progress(e.lengthComputable, e.loaded, e.total)
            }
        }).then(response => {
            // passing the file id to FilePond
            load(response.data)
            Logger.info('response:', response);
        }).catch((thrown) => {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message)
            } else {
                // handle error
            }
        });
        // Setup abort interface
        return {
            abort: () => {
                source.cancel('Operation canceled by the user.');
                abort();
            }
        }
    }

}

export default function ProductEdit({product, modal, toggle, categories, save, changeThumbnail}) {

    const [data, setData] = useState({id: product.id, name: product.name, description: product.description, price: product.price, category_id: product.category_id});

    const [files, setFiles] = useState([]);

    const handleChange = (event) => {

        if(event.target.name === 'price'){
            setData({
                ...data,
                [event.target.name]: Math.round(event.target.value*100)
            });
        }else {

            setData({
                ...data,
                [event.target.name]: event.target.value
            });

        }
    }

    useEffect(() => {
        if(data.id !== product.id){
            setData({id: product.id, name: product.name, description: product.description, price: product.price, category_id: product.category_id});
        }
    }, [product])

    useEffect(() => {
        Logger.info(files);
    }, [files])

    const handleSave = () => {
        Logger.info(data);
        save(data, files);
        setFiles([]);
    }

    const performThumbnailChange = (id) => {
        changeThumbnail(data.id, id);
    }

    return (
    <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true} className={'modal-lg'}>
        <ModalHeader toggle={toggle}>Edycja produktu</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="name">Nazwa</Label>
                    <Input type="text" name="name" id="name" placeholder="Nazwa produktu" value={data.name} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="price">Cena</Label>
                    <Input type="number" name="price" id="price" step="0.01" placeholder="Cena produktu" value={Helpers.displayAsPrice(data.price)} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Opis produktu</Label>
                    <Input type="textarea" name="description" id="description" placeholder="Opis produktu" value={data.description} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="category">Kategoria</Label>
                    <Input type="select" name="category" id="category" onChange={handleChange} defaultValue={data.category_id}>
                        {categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
                    </Input>
                </FormGroup>
                <ListGroup className="mb-3">
                    <ListGroupItem active>{product.all_media.length > 0 ? 'Aktualne zdjęcia' : 'Brak zdjęć poglądowych'}</ListGroupItem>
                    {
                        product['all_media'].map(({id, url}) => (
                            <ListGroupItem key={id}>
                                <Row>
                                    <Col>
                                       <img src={url} alt="" className="img-fluid mx-auto d-block"/>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col>
                                        <Button type="button" onClick={() => performThumbnailChange(id)} className="d-block w-100" color="outline-primary" disabled={url === product['thumbnail_url']}>Ustaw jako miniaturkę produktu</Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
                <Row>
                    <Col>
                        <FilePond
                            files={files}
                            name='newFile'
                            onupdatefiles={setFiles}
                            allowMultiple={true}
                            server={server}
                        />
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleSave}>Zapisz</Button>{' '}
            <Button color="secondary" onClick={toggle}>Anuluj</Button>
        </ModalFooter>
    </Modal>
    )
}