import React from 'react'
import getIcon from '@/utils/getIcon';

const generalInfoData = [
    {
        title: 'Status',
        icon: 'feather-git-commit',
        text: 'Customer',
    },
    {
        title: 'Source',
        icon: 'feather-facebook',
        text: 'Facebook',
    },
    {
        title: 'Default Language',
        icon: 'feather-airplay',
        text: 'System Default',
    },
    {
        title: 'Privacy',
        icon: 'feather-globe',
        text: 'Private',
    },
    {
        title: 'Created',
        icon: 'feather-clock',
        text: '26 MAY, 2023',
    },
    {
        title: 'Assigned',
        image: '/images/avatar/1.png',
        text: 'Alexandra Della',
    },
    {
        title: 'Lead By',
        image: '/images/avatar/5.png',
        text: 'Green Cute - Website design and development',
    },
];

const schoolInfoData = [
    {
        title: 'School Name',
        content: <a href="#">Alexandra Dell</a>,
    },
    {
        title: 'School Address',
        content: <>CEO, Founder at <a href="#">Theme Ocean</a></>,
    },
    {
        title: 'School Website',
        content: <a href="#">Theme Ocean</a>,
    },
    {
        title: 'School Phone Number',
        content: <a href="#">Theme Ocean</a>,
    },
    {
        title: 'School Email',
        content: <a href="#">Theme Ocean</a>,
    },
    {
        title: 'School Website',
        content: <a href="#">Theme Ocean</a>,
    },
    {
        title: 'PIC Name',
        content: <a href="#">alex.della@outlook.com</a>,
    },
    {
        title: 'PIC Phone Number',
        content: <a href="#">+01 (375) 5896 654</a>,
    },
    {
        title: 'PIC Email',
        content: <a href="#">https://themeforest.net/user/theme_ocean</a>,
    },
];

const TabLeadsProfile = () => {
    return (
        <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
            <div className="card card-body lead-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">
                        <span className="d-block mb-2">School Information :</span>
                        <span className="fs-12 fw-normal text-muted d-block">Following information for your lead</span>
                    </h5>
                </div>
                {schoolInfoData.map((data, index) => (
                    <Card
                        key={index}
                        title={data.title}
                        content={data.content}
                    />
                ))}
            </div>
            <hr />
            {/* <div className="card card-body general-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">
                        <span className="d-block mb-2">General Information :</span>
                        <span className="fs-12 fw-normal text-muted d-block">General information for your lead</span>
                    </h5>
                    <a href="#" className="btn btn-sm btn-light-brand">Edit Lead</a>
                </div>


                {generalInfoData.map((data, index) => (
                    <GeneralCard
                        key={index}
                        title={data.title}
                        icon={data.icon}
                        text={data.text}
                        image={data.image}
                    />
                ))}
                <div className="row mb-4">
                    <div className="col-lg-2 fw-medium">Tags</div>
                    <div className="col-lg-10 hstack gap-1"><a href="#" className="badge bg-soft-primary text-primary">VIP</a><a href="#" className="badge bg-soft-success text-success">High Rated</a><a href="#" className="badge bg-soft-warning text-warning">Promotions</a><a href="#" className="badge bg-soft-danger text-danger">Team</a><a href="#" className="badge bg-soft-teal text-teal">Updates</a></div>
                </div>
                <div className="row mb-4">
                    <div className="col-lg-2 fw-medium">Description</div>
                    <div className="col-lg-10 hstack gap-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, nulla veniam, ipsam nemo autem fugit earum accusantium reprehenderit recusandae in minima harum vitae doloremque quasi aut dolorum voluptate. Minima, deleniti.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, nulla veniam, ipsam nemo autem fugit earum accusantium reprehenderit recusandae in minima harum vitae doloremque quasi aut dolorum voluptate.</div>
                </div>
            </div> */}
        </div>
    )
}

export default TabLeadsProfile

const Card = ({ title, content }) => {
    return (
        <div className="row mb-4">
            <div className="col-lg-2 fw-medium">{title}</div>
            <div className="col-lg-10">{content}</div>
        </div>
    );
};

const GeneralCard = ({ title, icon, text, image }) => {
    return (
        <div className="row mb-4">
            <div className="col-lg-2 fw-medium">{title}</div>
            <div className="col-lg-10 hstack gap-1">
                <a href="#" className="hstack gap-2">
                    {icon && (
                        <div className="avatar-text avatar-sm">
                            {getIcon(icon)}
                        </div>
                    )}
                    {image && (
                        <div className="avatar-image avatar-sm">
                            <img src={image} alt="" className="img-fluid" />
                        </div>
                    )}
                    <span>{text}</span>
                </a>
            </div>
        </div>
    );
};
