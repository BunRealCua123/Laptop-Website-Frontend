import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Introduce() {
    const [editorContent, setEditorContent] = useState('Welcome to TinyMCE!');

    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };
    console.log('editorContent', editorContent);
    const text = `<header>
    <h1>Giới thiệu</h1>
    </header>
    <p><strong>Laptop Shop &ndash; Uy t&iacute;n trong từng sản phẩm</strong></p>
    <p><strong>C&ocirc;ng Ty TNHH&nbsp;TM &amp; Laptop Shop</strong></p>
    <p>Số ĐKKD : 0107622437 &ndash; Sở KH&amp;ĐT H&agrave; Nội cấp ng&agrave;y 04/11/2016</p>
    <p>Địa chỉ:&nbsp;<strong>79 L&ecirc; Thanh Nghị, Q. Hai B&agrave; Trưng, TP.&nbsp; H&agrave; Nội.</strong></p>
    <p>Hotline: 0853.111.999</p>
    <p>(C&oacute; chỗ để xe &ocirc; t&ocirc;)</p>
    <p><a href="http://online.gov.vn/Home/WebDetails/62354?fbclid=IwAR1TveFZbiYSde-i1t76SmEKb_6BHYu3fbieQ3YP3f_xf58c-oFeAU7mh4Q&amp;AspxAutoDetectCookieSupport=1"><img style="height: auto;" src="https://thegioiso365.vn/wp-content/uploads/2020/12/logoSaleNoti-e1605696764227.png" alt="" width="200" height="76"></a></p>
    <h1>Giới thiệu</h1>
    <p><strong>C&Ocirc;NG TY TNHH TM &amp; DV LAPTOP SHOP&nbsp;</strong></p>
    <p>LaptopShop l&agrave; một trong số đơn vị ti&ecirc;n phong h&agrave;ng đầu tại Việt Nam chuy&ecirc;n kinh doanh về mặt h&agrave;ng v&agrave; c&aacute;c dịch vụ về Laptop . Th&agrave;nh lập từ năm 2014 tới nay LaptopShop đ&atilde; tạo dựng được một thương hiệu vững chắc v&agrave; quen thuộc với thị trường Laptop hiện nay.</p>
    <p>Với Hơn 8 năm th&agrave;nh lập , LaptopShop đ&atilde; phục vụ tr&ecirc;n 50.000 kh&aacute;ch h&agrave;ng th&acirc;n thiết ,&nbsp; ch&uacute;ng t&ocirc;i cam kết tất cả c&aacute;c sản phẩm laptop b&aacute;n ra đều c&oacute; chất lượng tốt nhất tr&ecirc;n thị trường hiện nay. Tất cả laptop, linh kiện tại showroom đều được bảo h&agrave;nh chuẩn chỉ theo quy chế của c&aacute;c h&atilde;ng.</p>
    <p>Với sự đa dạng về c&aacute;c h&atilde;ng laptop được người ti&ecirc;u d&ugrave;ng lựa chọn nhiều nhất, đa dạng nhiều mẫu m&atilde; sản phẩm. Laptop Dell, HP, Lenovo, Thinjkpad, Asus, MSI, Acer, Macbook&hellip; Laptop Gaming, Laptop đồ họa, Laptop doanh nh&acirc;n cao cấp mỏng nhe, laptop văn ph&ograve;ng gi&aacute; rẻ, linh kiện laptop ch&iacute;nh h&atilde;ng&hellip;</p>
    <p>Với kinh nghiệm nhiều năm trong nghề c&ugrave;ng với đội ngũ kỹ sư chuy&ecirc;n ghiệp tận t&acirc;m LaptopShop lu&ocirc;n lu&ocirc;n nỗ lực để đem tới kh&aacute;ch h&agrave;ng những sản phẩm c&oacute; chất lượng tốt nhất, chế độ bảo h&agrave;nh v&agrave; hỗ trợ tốt nhất, mức gi&aacute; th&agrave;nh cạnh tranh ph&ugrave; hợp nhất, xứng đ&aacute;ng với từng số tiền m&agrave; kh&aacute;ch h&agrave;ng bỏ ra.</p>
    <p><strong>C&aacute;c dịch vụ hiện tại LaptopShop cung cấp:</strong></p>
    <p>&ndash; B&aacute;n bu&ocirc;n, b&aacute;n lẻ c&aacute;c d&ograve;ng Laptop&nbsp;ch&iacute;nh h&atilde;ng<br>&ndash; B&aacute;n bu&ocirc;n, bản lẻ linh kiện, phụ kiện laptop ch&iacute;nh h&atilde;ng như RAM, Ổ cứng, m&agrave;n h&igrave;nh, Pin, sạc, b&agrave;n ph&iacute;m&hellip;</p>
    <p><strong>Cam kết của LaptopShop với kh&aacute;ch h&agrave;ng:</strong></p>
    <p>Quy tụ đội ngũ nh&acirc;n vi&ecirc;n trẻ tuổi, c&oacute; chuy&ecirc;n m&ocirc;n, nhiệt huyết, tận tụy với kh&aacute;ch h&agrave;ng, khi t&igrave;m đến LaptopShop c&aacute;c bạn sẽ cảm thấy h&agrave;i l&ograve;ng khi tiếp x&uacute;c trực tiếp tại cửa h&agrave;ng hoặc qua điện thoại, nh&acirc;n vi&ecirc;n tư vấn của ch&uacute;ng t&ocirc;i sẽ hướng dẫn v&agrave; cung cấp cho kh&aacute;ch h&agrave;ng những th&ocirc;ng tin hữu &iacute;ch nhất với sự nhiệt th&agrave;nh v&agrave; th&acirc;n thiện. Đi theo phương ch&acirc;m &ldquo;Kiến tạo chất lượng &ndash; Kết nối sẻ chia&rdquo;, ch&uacute;ng t&ocirc;i lu&ocirc;n lắng nghe v&agrave; quan t&acirc;m tới nhu cầu của kh&aacute;ch h&agrave;ng, đồng thời kh&ocirc;ng ngừng n&acirc;ng cao chất lượng dịch vụ mỗi ng&agrave;y.</p>
    <p>Xin ch&acirc;n th&agrave;nh cảm ơn qu&yacute; kh&aacute;ch đ&atilde; ủng hộ LaptopShop . Sự h&agrave;i l&ograve;ng của qu&yacute; kh&aacute;ch ch&iacute;nh l&agrave; niềm vui v&agrave; tạo động lực gi&uacute;p ch&uacute;ng t&ocirc;i kh&ocirc;ng ngừng ho&agrave;n thiện v&agrave; ph&aacute;t triển dịch vụ hơn nữa!</p>
    <p><br><br></p>`;
    return (
        <div style={{ marginLeft: 30 }}>
            <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        // <Editor
        //     apiKey="q0h8s14cajdvqjuxgpvgk8c2rgo77exbx98jaekf44ql98s1"
        //     init={{
        //         plugins:
        //             'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        //         toolbar:
        //             'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        //         tinycomments_mode: 'embedded',
        //         tinycomments_author: 'Author name',
        //         mergetags_list: [
        //             { value: 'First.Name', title: 'First Name' },
        //             { value: 'Email', title: 'Email' },
        //         ],
        //         ai_request: (request, respondWith) =>
        //             respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        //     }}
        //     // initialValue="Welcome to TinyMCE!"
        //     value={editorContent}
        //     onEditorChange={handleEditorChange}
        // />
    );
}
