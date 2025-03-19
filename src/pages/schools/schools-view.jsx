import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import LeadsViewTab from '@/components/leadsViewCreate/LeadsViewTab'
import SchoolsViewContent from './components/SchoolsViewContent'
import SchoolsViewHeader from './components/SchoolsViewHeader'

const SchoolsView = () => {
    return (
        <>
            <PageHeader>
                <SchoolsViewHeader />
            </PageHeader>
            <LeadsViewTab />
            <div className='main-content'>
                <div className='tab-content'>
                    {/* <LeadssTable /> */}
                    <SchoolsViewContent />
                </div>
            </div>
        </>
    )
}

export default SchoolsView