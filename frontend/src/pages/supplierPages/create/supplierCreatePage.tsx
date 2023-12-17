import React, { useState, useEffect } from "react";
import {
    Space,
    Button,
    Col,
    Row,
    Divider,
    Form,
    Input,
    Card,
    message,
    Upload,
    Select,
    DatePicker,
    DatePickerProps,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../../interfaces/IUpload";
import { SupplierInterface } from "../../../interfaces/ISupplier";
import { CreateSupplier } from "../../../services/https";
import dayjs from "dayjs"

const { TextArea } = Input;

const CreateSupplierPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [supplierPicture, setSupplierPicture] = useState<ImageUpload>();
    const navigate = useNavigate();

    const onFinish = async (values: SupplierInterface) => {
        console.log(values);
        values.SupplierPicture = supplierPicture?.thumbUrl;

        let res = await CreateSupplier(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/product");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "บันทึกข้อมูลไม่สำเร็จ",
            });
        }
    };

    // const getCategory = async () => {
    //     let res = await GetCategories();
    //     if (res) {
    //         setCatergories(res);
    //     }
    // };

    // const getSupplier = async () => {
    //     let res = await GetSuppliers();
    //     if (res) {
    //         setSuppliers(res);
    //     }
    // };

    // useEffect(() => {
    //     getCategory();
    //     getSupplier();
    // }, []);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        setSupplierPicture(e?.fileList[0]);
        return e?.fileList;
    };
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div>
            {contextHolder}
            <Card style={{ margin: "5px", minHeight: "90vh" }}>
                <h2> เพิ่มข้อมูลโรงงานผลิต</h2>
                <Divider />
                <Form
                    name="basic"
                    layout="horizontal"
                    onFinish={onFinish}
                    autoComplete="off"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 32 }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ชื่อโรงงาน"
                                name="SupplierName"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกชื่อโรงงาน !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Space />
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="เบอร์โทรศัพท์"
                                name="SupplierTel"
                                rules={[{
                                    required: true,
                                    message: "กรุณาระบุเบอร์โทรศัพท์ !"
                                },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                },
                                {
                                    max: 10,
                                    message: 'กรุณาใส่เบอร์โทรศัพท์ที่มีความยาวไม่เกิน 10 ตัว'
                                }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="คำอธิบายโรงงานเพิ่มเติม"
                                name="SupplierDescription"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกคำอธิบายโรงงาน !",
                                    },
                                ]}
                            >
                                <TextArea style={{ maxHeight: "15vh", minHeight: "15vh" }} maxLength={200} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                style={{}}
                                label="รูปโรงงาน"
                                name="SupplierPicture"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาเพิ่มรูปโรงงาน !",
                                    },
                                ]}
                            >
                                <Upload maxCount={1} multiple={false} listType="picture-card">
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>อัพโหลด</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row >
                    <Row justify="end">
                        <Col style={{ marginTop: "20px" }}>
                            <Form.Item>
                                <Space>
                                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                                        ยกเลิก
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ backgroundColor: "#E48F44" }}
                                        icon={<PlusOutlined />}
                                    >
                                        ยืนยัน
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default CreateSupplierPage;
