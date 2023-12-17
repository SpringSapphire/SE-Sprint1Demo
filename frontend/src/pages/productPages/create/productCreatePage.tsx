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
import { ProductInterface } from "../../../interfaces/IProduct";
import { CategoryInterface } from "../../../interfaces/ICategory";
import { SupplierInterface } from "../../../interfaces/ISupplier";
import { CreateProduct, GetCategories, GetSuppliers } from "../../../services/https";
import dayjs from "dayjs"

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";


const CreateProductPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [productPicture, setProductPicture] = useState<ImageUpload>();
    const [catergories, setCatergories] = useState<CategoryInterface[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);
    const navigate = useNavigate();

    const onFinish = async (values: ProductInterface) => {
        console.log(values);
        console.log(values.CategoryID);
        console.log(values.SupplierID);
        values.ProductPicture = productPicture?.thumbUrl;

        let res = await CreateProduct(values);
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

    const getCategory = async () => {
        let res = await GetCategories();
        if (res) {
            setCatergories(res);
        }
    };

    const getSupplier = async () => {
        let res = await GetSuppliers();
        if (res) {
            setSuppliers(res);
        }
    };

    useEffect(() => {
        getCategory();
        getSupplier();
    }, []);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        setProductPicture(e?.fileList[0]);
        return e?.fileList;
    };
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div>
            {contextHolder}
            <Card style={{ margin: "5px", minHeight: "90vh" }}>
                <h2> เพิ่มข้อมูลสินค้า</h2>
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
                                label="ชื่อสินค้า"
                                name="ProductName"
                                rules={[
                                    {
                                        // required: true,
                                        message: "กรุณากรอกชื่อสินค้า !",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Space />
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ราคา"
                                name="Price"
                                rules={[{
                                    required: true,
                                    message: "กรุณาระบุราคา !"
                                }]}
                                getValueFromEvent={(e) => {
                                    // Convert the "Price" field to an integer
                                    const intValue = parseInt(e.target.value, 10); // Use base 10 for decimal numbers
                                    // Check if the conversion results in NaN
                                    if (!isNaN(intValue)) {
                                        return intValue;
                                    }
                                    // If NaN, return undefined to avoid displaying "NaN"
                                    return undefined;
                                }}
                            >
                                <Input suffix="บาท" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ประเภทสินค้า"
                                name="CategoryID"
                                rules={[{
                                    required: true,
                                    message: "กรุณาเลือกประเภทสินค้า !"
                                }]}
                            >
                                <Select allowClear>
                                    {catergories.map((item) => (
                                        <Option value={item.ID} key={item.CategoryName}>
                                            {item.CategoryName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="โรงงานที่ผลิต"
                                name="SupplierID"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาเลือกโรงงานที่ผลิตสินค้า !",
                                    },
                                ]}
                            >
                                <Select allowClear>
                                    {suppliers.map((item) => (
                                        <Option value={item.ID} key={item.SupplierName}>
                                            {item.SupplierName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="คำอธิบายสินค้า"
                                name="Description"
                                rules={[
                                    {
                                        // required: true,
                                        message: "กรุณากรอกคำอธิบายสินค้า !",
                                    },
                                ]}
                            >
                                <TextArea style={{ maxHeight: "15vh", minHeight: "15vh" }} maxLength={200} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="วันที่เพิ่มสินค้า"
                                name="DateAdded"
                                
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณาเลือกวันที่เพิ่มสินค้า !",
                                    },
                                ]}
                            >
                                <DatePicker onChange={onChangeDate} format={dateFormat}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                style={{}}
                                label="รูปสินค้า"
                                name="ProductPicture"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
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

export default CreateProductPage;
